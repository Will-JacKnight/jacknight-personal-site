import NavBar from "@/components/NavBar"
import Link from "next/link"

// This would typically come from an API or file system
const blogPosts = [
  {
    slug: "hello-world",
    title: "Hello World",
    excerpt: "Welcome to my first blog post! This is a sample post to demonstrate the blog functionality.",
    date: "2024-03-21",
    tags: ["Next.js", "TypeScript", "Web Development"]
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Blog</h1>
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="rounded-lg border p-6 hover:border-primary/50 transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-semibold mb-2 hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
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
            ))}
          </div>
        </div>
      </main>
    </div>
  )
} 