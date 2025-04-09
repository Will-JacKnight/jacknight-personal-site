import NavBar from "@/components/NavBar"
import BlogPost from "@/components/BlogPost"
import Link from "next/link"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-muted-foreground hover:text-primary mb-8"
          >
            ← Back to Blogs
          </Link>
          <BlogPost slug={params.slug} />
        </div>
      </main>
    </div>
  )
} 