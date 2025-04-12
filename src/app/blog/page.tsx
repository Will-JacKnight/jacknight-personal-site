import PageLayout from "@/components/PageLayout"
import Link from "next/link"
import { allBlogs } from "@/lib/content-collections"

export default function BlogPage() {
  // Sort blogs: featured posts first, then by date (newest first)
  const blogs = [...allBlogs].sort((a, b) => {
    // If one post has highlight and the other doesn't, prioritize the highlighted one
    if (a.highlight && !b.highlight) return -1;
    if (!a.highlight && b.highlight) return 1;
    
    // If both have highlight or both don't have highlight, sort by date
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        
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
                    {post.highlight && (
                      <span className="px-2 py-1 text-xs font-medium bg-amber-500/20 text-amber-600 dark:bg-amber-500/30 dark:text-amber-400 rounded-full font-semibold">
                        {post.highlight}
                      </span>
                    )}
                  </div>
                  <time dateTime={post.date} className="text-sm text-muted-foreground">
                    {new Date(post.date).toLocaleDateString()}
                  </time>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  )
} 