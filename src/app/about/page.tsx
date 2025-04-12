import PageLayout from "@/components/PageLayout"
import { Github, Linkedin, Mail } from "lucide-react"
import { config } from "@/lib/config"

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Me</h1>
        <div className="prose dark:prose-invert">
          <p className="text-lg mb-6">
            Hi, I'm Jiankai, you may also know me as Jacknight. I'm now a Computing postgraduate at Imperial College London.
          </p>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Background</h3>
              <p>
                A Mechanical Engineering graduate, a software developer and a machine learning enthusiast. 
                Had some experience with project management, more happy to build products.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Philosophy</h3>
              <p>
                Good products speak for themselves. Our job is to make them heard.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Current Focus</h3>
              <p>
                Currently exploring machine learning applications and large scale software,
                with a particular interest in creating sustainable and scalable solutions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <div className="flex flex-wrap gap-4">
                <a
                  href={config.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={config.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={config.author.email}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
} 