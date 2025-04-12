const { readdir, readFile } = require('fs/promises');
const { join, relative } = require('path');
const { promises: fsPromises } = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { Feed } = require('feed');
const { marked } = require('marked');
const { config } = require('../src/lib/config');

const BASE_URL = config.site.baseUrl;
const AUTHOR = {
  name: config.author.name,
  email: config.author.email,
  link: BASE_URL
};

async function scanMarkdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await scanMarkdownFiles(fullPath));
    } else if (entry.name.endsWith('.md')) {
      const content = await readFile(fullPath, 'utf-8');
      const { data, content: markdown } = matter(content);
      
      // Get relative path and convert to URL path
      const relativePath = relative(join(process.cwd(), 'src/content'), dir);
      const urlPath = join(relativePath, entry.name.replace('.md', '')).replace(/\\/g, '/');
      
      files.push({
        ...data,
        content: markdown,
        url: `${BASE_URL}/${urlPath}`,
        date: new Date(data.date),
        updated: data.updated ? new Date(data.updated) : undefined
      });
    }
  }

  return files;
}

async function generateRSSFeed() {
  const contentDir = join(process.cwd(), 'src/content/blog');
  
  try {
    // Scan markdown files
    const posts = await scanMarkdownFiles(contentDir);

    // Sort posts by date
    posts.sort((a, b) => b.date - a.date);

    // Create feed
    const feed = new Feed({
      title: config.rss.title,
      description: config.rss.description,
      id: BASE_URL,
      link: BASE_URL,
      language: "en",
      image: `${BASE_URL}/favicon.png`,
      favicon: `${BASE_URL}/favicon.ico`,
      copyright: `All rights reserved ${new Date().getFullYear()}, ${config.author.name}`,
      updated: new Date(),
      generator: "Feed for Node.js",
      feedLinks: {
        rss2: `${BASE_URL}/rss.xml`,
        json: `${BASE_URL}/feed.json`,
        atom: `${BASE_URL}/atom.xml`,
      },
      author: AUTHOR
    });

    // Add posts to feed
    for (const post of posts) {
      const htmlContent = marked(post.content);
      
      feed.addItem({
        title: post.title,
        id: post.url,
        link: post.url,
        description: post.description || "",
        content: htmlContent,
        author: [AUTHOR],
        date: post.date,
        updated: post.updated,
      });
    }

    // Write feed files
    await fsPromises.writeFile('./public/rss.xml', feed.rss2());
    await fsPromises.writeFile('./public/atom.xml', feed.atom1());
    await fsPromises.writeFile('./public/feed.json', feed.json1());

    console.log(`Generated RSS feeds with ${posts.length} items`);
  } catch (error) {
    console.error('Error generating RSS feeds:', error);
  }
}

generateRSSFeed().catch(console.error); 