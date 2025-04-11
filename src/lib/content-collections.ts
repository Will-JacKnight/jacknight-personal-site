// This is a proxy file that re-exports from the generated content collections
// It helps with TypeScript and webpack resolution
import { defineConfig, defineCollection } from '@content-collections/core';
import config from '../../content-collections';

// Define the Blog type to match your content-collections schema
export type Blog = {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  tags?: string[];
  description?: string;
  featured?: boolean;
  content: string;
  _meta: {
    path: string;
  };
};

// Import the blog posts directly from the content directory
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Manually read and parse blog posts
const contentDir = path.join(process.cwd(), 'src/content/blog');
const allBlogs: Blog[] = [];

// Only run this code on the server side
if (typeof window === 'undefined' && fs.existsSync(contentDir)) {
  const files = fs.readdirSync(contentDir);
  
  files.forEach(filename => {
    if (filename.endsWith('.md')) {
      const filePath = path.join(contentDir, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      allBlogs.push({
        slug: filename.replace('.md', ''),
        title: data.title,
        date: data.date,
        updated: data.updated,
        tags: data.tags,
        description: data.description,
        featured: data.featured,
        content,
        _meta: {
          path: filename.replace('.md', '')
        }
      });
    }
  });
}

export { allBlogs }; 