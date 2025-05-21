import PageLayout from "@/components/PageLayout"
import { Github, Linkedin, Mail } from "lucide-react"
import { config } from "@/lib/config"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

// Define sections with consistent structure for cards
const aboutSections = [
  {
    title: "Background",
    content: "A machine learning engineer, a software developer. Had some experience with project management, more happy to build products. A person with a warm heart."
  },
  {
    title: "Philosophy",
    content: "Quality over profit. Deep consideration to details, reject shabby and lousy products."
  },
  {
    title: "Current Focus",
    content: "Currently exploring evolutionary reinforcement learning in robotics and large scale software, with a particular interest in creating sustainable and scalable solutions."
  }
];

// Contact links
const contactLinks = [
  {
    name: "GitHub",
    icon: <Github className="w-5 h-5" />,
    href: config.social.github
  },
  {
    name: "LinkedIn",
    icon: <Linkedin className="w-5 h-5" />,
    href: config.social.linkedin
  },
  {
    name: "Email",
    icon: <Mail className="w-5 h-5" />,
    href: `mailto:${config.author.email}`
  }
];

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Me</h1>
        
        <p className="text-lg mb-8">
          Hi, I'm Jiankai. I'm now doing my MSc Computing degree at Imperial College London.
        </p>
        
        <div className="flex flex-col gap-6">
          {aboutSections.map((section, index) => (
            <Card key={index} variant="hover">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{section.content}</p>
              </CardContent>
            </Card>
          ))}

          <Card variant="hover">
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Feel free to reach out to me through any of the following channels.</p>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-4">
              {contactLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </a>
              ))}
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
} 