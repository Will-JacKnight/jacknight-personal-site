import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Blog.css';
import '../styles/shared.css';
import Card from '../components/Card';

// Simple front matter parser for the browser
const parseFrontMatter = (content) => {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { metadata: {}, content };

  try {
    const metadata = {};
    const frontMatter = match[1];
    
    // Parse each line of front matter
    frontMatter.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        let value = valueParts.join(':').trim();
        // Remove quotes if present
        value = value.replace(/^"(.*)"$/, '$1');
        // Parse arrays (assuming simple format like tags: [tag1, tag2])
        if (value.startsWith('[') && value.endsWith(']')) {
          value = value.slice(1, -1).split(',').map(item => item.trim());
        }
        metadata[key.trim()] = value;
      }
    });

    return {
      metadata,
      content: match[2]
    };
  } catch (err) {
    console.warn('Error parsing front matter:', err);
    return { metadata: {}, content };
  }
};

// Main blog listing page at /blog
const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        // Step 1: Fetch the index.json file to check what files are available
        const response = await fetch('/posts/index.json');
        
        // If the index.json doesn't exist or fails, we'll try our backup approach
        if (!response.ok) {
          console.warn('Could not load posts index, trying alternate approach');
          await loadPostsManually();
          return;
        }
        
        // Get the index of all posts
        const postsIndex = await response.json();
        
        // Step 2: Fetch the actual content of each post
        const postPromises = postsIndex.map(async (postInfo) => {
          try {
            const response = await fetch(`/posts/${postInfo.slug}.md`);
            if (!response.ok) {
              console.warn(`Failed to load ${postInfo.slug}.md`);
              return null;
            }
            
            const text = await response.text();
            const { metadata } = parseFrontMatter(text);
            
            // Combine the index metadata with the front matter metadata
            // Front matter takes precedence if there's a conflict
            return {
              ...postInfo,
              ...metadata,
              date: new Date(metadata.date || postInfo.date)
            };
          } catch (err) {
            console.warn(`Error processing ${postInfo.slug}.md:`, err);
            return null;
          }
        });

        const loadedPosts = (await Promise.all(postPromises))
          .filter(post => post !== null);
        
        // Sort posts by date, newest first
        const sortedPosts = loadedPosts.sort((a, b) => 
          b.date - a.date
        );
        
        setPosts(sortedPosts);
        setError(null);
      } catch (err) {
        console.error('Error loading posts from index:', err);
        
        // Fall back to manual discovery if loading from index fails
        await loadPostsManually();
      } finally {
        setLoading(false);
      }
    };
    
    // Fallback method to discover posts
    const loadPostsManually = async () => {
      try {
        // First, we'll check the directory for all .md files
        // This requires a slightly different approach since browsers can't list directories
        
        // Known post files (from your directory listing)
        const knownPostFiles = [
          'my-first-post.md',
          'early-thoughts-of-orion.md'
        ];
        
        // Try to discover any other md files that might exist
        // by trying to fetch them (this would be more robust with a server-side solution)
        const postPromises = knownPostFiles.map(async (filename) => {
          try {
            const response = await fetch(`/posts/${filename}`);
            if (!response.ok) {
              console.warn(`Failed to load ${filename}`);
              return null;
            }
            
            const text = await response.text();
            const { metadata } = parseFrontMatter(text);
            
            // Extract slug from filename (remove .md extension)
            const slug = filename.replace('.md', '');
            
            // Only return if we have required metadata
            if (metadata.title && metadata.date) {
              return {
                ...metadata,
                slug,
                date: new Date(metadata.date)
              };
            }
            return null;
          } catch (err) {
            console.warn(`Error processing ${filename}:`, err);
            return null;
          }
        });

        const loadedPosts = (await Promise.all(postPromises))
          .filter(post => post !== null);
        
        // Sort posts by date, newest first
        const sortedPosts = loadedPosts.sort((a, b) => 
          b.date - a.date
        );
        
        setPosts(sortedPosts);
        setError(null);
      } catch (err) {
        console.error('Error loading posts manually:', err);
        setError('Failed to load blog posts');
      }
    };

    loadPosts();
  }, []);

  if (loading) return (
    <section id="blog" className="blog-section">
      <div className="blog-container">
        <h2 className="section-title">Blog</h2>
        <div className="blog-loading">Loading posts...</div>
      </div>
    </section>
  );

  if (error) return (
    <section id="blog" className="blog-section">
      <div className="blog-container">
        <h2 className="section-title">Blog</h2>
        <div className="blog-error">{error}</div>
      </div>
    </section>
  );

  return (
    <section id="blog" className="blog-section">
      <div className="blog-container">
        <h2 className="section-title">Articles</h2>
        <div className="blog-posts">
          {posts.map((post) => (
            <Card
              key={post.slug}
              title={post.title}
              description={post.description}
              date={post.date.toLocaleDateString()}
              tags={post.tags}
              link={`/blog/${post.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog; 