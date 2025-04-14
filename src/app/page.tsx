import PageLayout from "@/components/PageLayout"
import { ArrowDown } from 'lucide-react'

export default function Home() {
  return (
    <PageLayout>
      <section className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] relative">
        <div className="text-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight leading-tight fade-in-up">
            Simplify & Improve
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto delayed-fade-in">
            Welcome to Jacknight's personal website.
          </p>
        </div>
        
        {/* <div className="absolute bottom-12 opacity-60 bounce">
          <ArrowDown size={24} />
        </div> */}
      </section>
    </PageLayout>
  )
}