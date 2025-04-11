import PageLayout from "@/components/PageLayout"

export default function Home() {
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Personal Page</h1>
        <p className="text-xl text-muted-foreground mb-8">
          This is a Next.js powered personal website
        </p>
      </div>
    </PageLayout>
  )
}