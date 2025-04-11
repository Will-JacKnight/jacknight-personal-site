import PageLayout from "@/components/PageLayout"

export default function Home() {
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <h1 className="text-4xl font-bold mb-4">Simplify & Improve</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Welcome to Jacknight's personal website.
        </p>
      </div>
    </PageLayout>
  )
}