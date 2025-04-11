"use client"

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Highlight, themes } from 'prism-react-renderer';
import { cn } from "@/lib/utils";

interface BlogPostProps {
  slug: string;
}

interface Post {
  metadata: {
    title?: string;
    date?: string;
    tags?: string[];
  };
  content: string;
}

// Simple front matter parser
const parseFrontMatter = (content: string) => {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { metadata: {}, content };

  try {
    const metadata: Record<string, any> = {};
    const frontMatter = match[1];
    
    frontMatter.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        let value = valueParts.join(':').trim();
        value = value.replace(/^"(.*)"$/, '$1');
        if (value.startsWith('[') && value.endsWith(']')) {
          metadata[key.trim()] = value.slice(1, -1).split(',').map(item => item.trim());
        } else {
          metadata[key.trim()] = value;
        }
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

export default function BlogPost({ slug }: BlogPostProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await fetch(`/posts/${slug}.md`);
        if (!response.ok) {
          throw new Error('Post not found');
        }
        const text = await response.text();
        const { metadata, content } = parseFrontMatter(text);
        setPost({ metadata, content });
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    loadPost();
  }, [slug]);

  if (error) return <div className="text-destructive">Error: {error}</div>;
  if (!post) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <article className="prose dark:prose-invert max-w-none">
      <header className="mb-8 card-custom">
        <h1 className="text-4xl font-bold mb-4">{post.metadata?.title}</h1>
        {post.metadata?.date && (
          <time dateTime={post.metadata.date} className="text-muted-foreground">
            {new Date(post.metadata.date).toLocaleDateString()}
          </time>
        )}
        {post.metadata?.tags && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.metadata.tags.map(tag => (
              <span key={tag} className="px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <div className="card-custom prose dark:prose-invert">
        <ReactMarkdown
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              const isInline = !className;
              return !isInline && match ? (
                <Highlight
                  theme={themes.vsDark}
                  code={String(children).replace(/\n$/, '')}
                  language={match[1]}
                >
                  {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className={cn(className, "rounded-lg p-4 my-4 shadow-inner border border-secondary/50")} style={style}>
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
                <code className={cn(className, "bg-secondary/30 px-1.5 py-0.5 rounded-md")} {...props}>
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