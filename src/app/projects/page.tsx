import PageLayout from "@/components/PageLayout"
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
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Projects</h1>
        <div className="flex flex-col gap-8">
          {projects.map((project, index) => {
            // For projects with links, make the whole card clickable
            const ProjectWrapper = project.link 
              ? ({ children }: { children: React.ReactNode }) => (
                  <Link 
                    href={project.link!}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="block group"
                  >
                    {children}
                  </Link>
                )
              : ({ children }: { children: React.ReactNode }) => <>{children}</>;

            return (
              <ProjectWrapper key={index}>
                <div className={`card-custom ${project.link ? 'group-hover:cursor-pointer' : ''}`}>
                  <h2 className={`text-2xl font-semibold mb-2 ${project.link ? 'group-hover:text-primary transition-colors duration-200' : ''}`}>
                    {project.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
                        {tag}
                      </span>
                    ))}
                    {project.highlight && (
                      <span className="px-2 py-1 text-xs font-medium bg-amber-500/20 text-amber-600 dark:bg-amber-500/30 dark:text-amber-400 rounded-full font-semibold">
                        {project.highlight}
                      </span>
                    )}
                  </div>
                  {project.link && (
                    <div className="inline-flex items-center group/link text-primary mt-auto">
                      <span>View Project</span>
                      <span className="ml-1 transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                    </div>
                  )}
                </div>
              </ProjectWrapper>
            );
          })}
        </div>
      </div>
    </PageLayout>
  )
} 