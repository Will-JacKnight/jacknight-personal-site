import PageLayout from "@/components/PageLayout"
import BlogPost from "@/components/BlogPost"
import Link from "next/link"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-muted-foreground hover:text-primary mb-8"
        >
          ← Back to Blogs
        </Link>
        <BlogPost slug={params.slug} />
      </div>
    </PageLayout>
  )
} 