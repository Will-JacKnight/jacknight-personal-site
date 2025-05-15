const { readdir, readFile } = require('fs/promises');
const { join, relative } = require('path');
const { promises: fsPromises } = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { Feed } = require('feed');
const { marked } = require('marked');
const fs = require('fs');

// Function to load the TypeScript config file
function loadConfig() {
  try {
    // Read the TypeScript config file
    const configPath = join(process.cwd(), 'src/lib/config.ts');
    const configContent = fs.readFileSync(configPath, 'utf-8');
    
    // Extract the configuration object using a regular expression
    // This is a simple approach that works for basic TS files
    const configMatch = configContent.match(/export const config = ({[\s\S]*?});/);
    if (!configMatch) {
      throw new Error('Could not parse config file');
    }
    
    // Remove TypeScript-specific syntax that would cause issues in eval
    let configJson = configMatch[1]
      .replace(/as const/g, '')
      .replace(/new URL\(["']([^"']+)["']\)/g, '"$1"');
    
    // Use Function constructor instead of eval for better isolation
    const configObject = new Function(`return ${configJson}`)();
    return configObject;
  } catch (error) {
    console.error('Error loading config:', error);
    process.exit(1);
  }
}

// Load the config
const config = loadConfig();

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
      
      // Ensure we have valid date objects
      const pubDate = data.date ? new Date(data.date) : new Date();
      const updatedDate = data.updated ? new Date(data.updated) : undefined;
      
      // Validate the dates before adding to files
      const isValidDate = date => date instanceof Date && !isNaN(date);
      
      files.push({
        ...data,
        content: markdown,
        url: `${BASE_URL}/${urlPath}`,
        date: isValidDate(pubDate) ? pubDate : new Date(),
        updated: updatedDate && isValidDate(updatedDate) ? updatedDate : undefined
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
      
      // Ensure all required fields are valid
      feed.addItem({
        title: post.title || 'Untitled Post',
        id: post.url,
        link: post.url,
        description: post.description || "",
        content: htmlContent,
        author: [AUTHOR],
        date: post.date,
        // Only include updated if it's a valid date
        ...(post.updated ? { updated: post.updated } : {})
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