import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Point to the content directory relative to the frontend
const postsDirectory = path.join(process.cwd(), '..', 'content', 'blogs', 'posts');

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  slug: string;
  content: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    console.warn('Posts directory not found:', postsDirectory);
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const id = fileName.replace(/\.md$/, '');
        return await getPostById(id);
      })
  );

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostById(id: string): Promise<BlogPost> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(content);
  
  const htmlContent = processedContent.toString();

  return {
    id,
    title: data.title || '',
    date: data.date || new Date().toISOString(),
    description: data.description || '',
    tags: data.tags || [],
    slug: data.slug || id,
    content: htmlContent,
  };
}

export function getAllPostIds() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => ({
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }));
} 