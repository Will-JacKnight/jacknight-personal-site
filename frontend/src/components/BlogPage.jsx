import { useParams, Link } from 'react-router-dom';
import BlogPost from './BlogPost';
import '../styles/Blog.css';

function BlogPage() {
  const { slug } = useParams();

  return (
    <section id="blog" className="blog-section">
      <div className="blog-container">
        <Link to="/blog" className="back-to-blogs">← Back to Blogs</Link>
        <div className="blog-content">
          <BlogPost slug={slug} />
        </div>
      </div>
    </section>
  );
}

export default BlogPage; 