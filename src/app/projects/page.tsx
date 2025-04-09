import NavBar from "@/components/NavBar"
import Link from "next/link"

const projects = [
  {
    title: "Quality-Diversity Reinforcement Learning for Damage Recovery in Robotics",
    description: "A deep reinforcement learning-based research to enable robots to recover from unexpected mechanical damages in a handful of minutes.",
    tags: ["Reinforcement Learning", "Robotics", "Python"],
    highlight: "In Progress"
  },
  {
    title: "Bidding Hub",
    description: "A scalable and real-time auction platform to browse live auctions, place competitive bids, and manage the listings.",
    tags: ["Flask", "Docker", "React", "PostgreSQL", "Websockets"],
    link: "https://www.youtube.com/watch?v=zzumh5iMX88"
  },
  {
    title: "Driving Condition-based Energy Management Strategy of Hybrid Vehicles",
    description: "Developed an online driving condition recognition algorithm using Time Convolutional Networks (TCN) to accurately classify real-time driving conditions. Designed a condition-adaptive energy management strategy, demonstrated lower overall energy consumption across varying driving scenarios.",
    tags: ["Reinforcement Learning", "DDPG", "TCN", "Pytorch"],
  },
  {
    title: "Variational Autoencoder-based Driving Condition Generation",
    description: "Developed a driving cycle generation algorithm using a Variational Autoencoder (VAE) to create a representative driving condition database, enabling a lower-cost alternative to real-world data collection while maintaining accuracy and diversity in driving conditions.",
    tags: ["Variational Autoencoder", "LSTM", "PCA", "Pytorch"],
  }
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Projects</h1>
          <div className="grid gap-6">
            {projects.map((project, index) => (
              <div key={index} className="rounded-lg border p-6 hover:border-primary/50 transition-colors">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
                  {project.highlight && (
                    <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                      {project.highlight}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <Link 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View Project →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
} 