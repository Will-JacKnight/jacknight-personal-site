import { useState, useEffect } from 'react';
import '../styles/Blog.css';
import BlogPost from './BlogPost';

function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // In a real app, this would be an API call
    setPosts([
      {
        slug: 'building-a-modern-portfolio',
        title: 'Building a Modern Portfolio Website with React',
        date: '2024-03-21',
        description: 'A comprehensive guide on creating a modern, responsive portfolio website using React and modern web technologies.'
      }
    ]);
  }, []);

  return (
    <section id="blog" className="blog-section">
      <div className="blog-container">
        <h2 className="section-title">Blog</h2>
        <div className="blog-posts">
          {posts.map(post => (
            <div key={post.slug} className="blog-preview">
              <h3>{post.title}</h3>
              <time>{new Date(post.date).toLocaleDateString()}</time>
              <p>{post.description}</p>
              <div className="blog-content">
                <BlogPost slug={post.slug} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog; 