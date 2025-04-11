import PageLayout from "@/components/PageLayout"
import Link from "next/link"
import { allBlogs } from "@/lib/content-collections"

export default function BlogPage() {
  // Sort blogs by date (newest first)
  const blogs = [...allBlogs].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        
        {blogs.length === 0 ? (
          <div className="card-custom">
            <p className="text-muted-foreground">No blog posts found. Posts will appear here once they are available.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {blogs.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`} 
                className="block group"
              >
                <article className="card-custom group-hover:cursor-pointer">
                  <h2 className="text-2xl font-semibold mb-2 transition-colors duration-200 group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 flex-grow">{post.description || ""}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {post.tags && post.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <time dateTime={post.date} className="text-sm text-muted-foreground">
                      {new Date(post.date).toLocaleDateString()}
                    </time>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  )
} 