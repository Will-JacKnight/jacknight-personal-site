import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Highlight, themes } from 'prism-react-renderer';

function BlogPost({ slug }) {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/content/posts/${slug}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load post');
        }
        return response.json();
      })
      .then(data => {
        setPost({
          ...data.metadata,
          content: data.content
        });
      })
      .catch(error => {
        console.error('Error loading blog post:', error);
        setError(error.message);
      });
  }, [slug]);

  if (error) return <div className="blog-error">{error}</div>;
  if (!post) return <div className="blog-loading">Loading...</div>;

  return (
    <article className="blog-post">
      <header className="blog-post-header">
        <h1>{post.title}</h1>
        {post.date && (
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString()}
          </time>
        )}
        {post.tags && (
          <div className="blog-post-tags">
            {post.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </header>
      <div className="blog-post-content">
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <Highlight
                  theme={themes.vsDark}
                  code={String(children).replace(/\n$/, '')}
                  language={match[1]}
                >
                  {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className={className} style={style}>
                      {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}

export default BlogPost; 