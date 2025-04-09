import NavBar from "@/components/NavBar"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
          <h1 className="text-4xl font-bold mb-4">Welcome to My Personal Page</h1>
          <p className="text-xl text-muted-foreground mb-8">
            This is a Next.js powered personal website
          </p>
          <ThemeToggle />
        </div>
      </main>
    </div>
  )
}