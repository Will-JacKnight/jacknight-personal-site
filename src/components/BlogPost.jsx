import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Highlight, themes } from 'prism-react-renderer';

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

// Individual post content renderer
function BlogPost({ slug }) {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        // Use the base URL for fetching posts
        const response = await fetch(`${import.meta.env.BASE_URL}posts/${slug}.md`);
        if (!response.ok) {
          throw new Error('Post not found');
        }
        const text = await response.text();
        
        // Parse front matter and content
        const { metadata, content } = parseFrontMatter(text);
        setPost({ metadata, content });
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    loadPost();
  }, [slug]);

  if (error) return <div className="blog-error">{error}</div>;
  if (!post) return <div className="blog-loading">Loading...</div>;

  return (
    <article className="blog-post">
      <header className="blog-post-header">
        <h1>{post.metadata?.title}</h1>
        {post.metadata?.date && (
          <time dateTime={post.metadata.date}>
            {new Date(post.metadata.date).toLocaleDateString()}
          </time>
        )}
        {post.metadata?.tags && (
          <div className="blog-post-tags">
            {post.metadata.tags.map(tag => (
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