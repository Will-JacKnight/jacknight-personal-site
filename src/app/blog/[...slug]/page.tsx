import PageLayout from "@/components/PageLayout"
import Link from "next/link"
import { allBlogs } from "@/lib/content-collections"
import { notFound } from "next/navigation"
import ReactMarkdown from 'react-markdown';
import { Highlight, themes } from 'prism-react-renderer';
import { cn } from "@/lib/utils";
import type { Metadata } from "next"
import { Tag } from "@/components/ui/tag"

type BlogPageProps = {
  params: { slug: string[] }
}

function getBlogFromParams(slugs: string[]) {
  const slug = slugs?.join("/") || ""
  const blog = allBlogs.find((blog) => blog.slug === slug)

  if (!blog) {
    return null
  }

  return blog
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const blog = getBlogFromParams(params.slug)

  if (!blog) {
    return {
      title: 'Blog Post Not Found'
    }
  }

  return {
    title: `${blog.title} | Jacknight`,
    description: blog.description || blog.title,
  }
}

export function generateStaticParams(): { slug: string[] }[] {
  return allBlogs.map((blog) => ({
    slug: blog.slug.split('/'),
  }))
}

export default function BlogPage({ params }: BlogPageProps) {
  const blog = getBlogFromParams(params.slug)

  if (!blog) {
    notFound()
  }

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-muted-foreground hover:text-primary mb-8"
        >
          ← Back to Blogs
        </Link>
        
        <article className="prose dark:prose-invert max-w-none">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            {blog.date && (
              <time dateTime={blog.date} className="text-muted-foreground">
                {new Date(blog.date).toLocaleDateString()}
              </time>
            )}
            {blog.tags && (
              <div className="flex flex-wrap gap-2 mt-4">
                {blog.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
                {blog.highlight && (
                  <Tag variant="highlight">{blog.highlight}</Tag>
                )}
              </div>
            )}
          </header>
          
          <div className="prose dark:prose-invert">
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
                        <pre className={cn(className, "rounded-lg p-4 my-4")} style={style}>
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
              {blog.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </PageLayout>
  )
} 