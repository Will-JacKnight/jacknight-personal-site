import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Jack Knight",
  description: "Thoughts, tutorials, and insights on web development, TypeScript, and more.",
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
} 