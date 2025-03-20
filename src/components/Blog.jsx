import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Blog.css';
import '../styles/shared.css';

// Main blog listing page at /blog
function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/content/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
        setError('Failed to load blog posts');
        setLoading(false);
      });
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
          {posts.map(post => (
            <div key={post.slug} className="blog-preview">
              <Link to={`/blog/${post.slug}`} className="blog-link">
                <h3>{post.title}</h3>
                <time>{new Date(post.date).toLocaleDateString()}</time>
                <p>{post.description}</p>
                {post.tags && (
                  <div className="tags-container">
                    {post.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog; 