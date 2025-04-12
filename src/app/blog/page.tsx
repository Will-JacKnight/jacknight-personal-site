import PageLayout from "@/components/PageLayout"
import Link from "next/link"
import { allBlogs } from "@/lib/content-collections"
import { Tag } from "@/components/ui/tag"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

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
              <Card variant="interactive">
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors duration-200">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {post.description || ""}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-wrap gap-2">
                      {post.tags && post.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                      {post.highlight && (
                        <Tag variant="highlight">{post.highlight}</Tag>
                      )}
                    </div>
                    <time dateTime={post.date} className="text-sm text-muted-foreground">
                      {new Date(post.date).toLocaleDateString()}
                    </time>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  )
} 