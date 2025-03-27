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
        // Fetch and parse each markdown file directly
        const postFiles = [
          'my-first-post.md',
          'building-a-modern-portfolio.md',
          'README.md'
        ];

        const postPromises = postFiles.map(async (filename) => {
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
          .filter(post => post !== null); // Remove any failed posts
        
        // Sort posts by date, newest first
        const sortedPosts = loadedPosts.sort((a, b) => 
          b.date - a.date
        );
        
        setPosts(sortedPosts);
        setError(null);
      } catch (err) {
        console.error('Error loading posts:', err);
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
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