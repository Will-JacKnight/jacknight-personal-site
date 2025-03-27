import '../styles/Projects.css';
import Card from './Card';

function Projects() {
  const projects = [
    // {
    //   title: "Damage Recovery in Robotics",
    //   description: "A deep reinforcement learning-based research to enable robots to recover from unexpected mechanical damages in a handful of minutes.",
    //   tags: ["Reinforcement Learning", "Robotics", "Python"],
    //   link: "#"
    // },
    {
      title: "BiddingHub",
      description: "A scalable and real-time auction platform to browse live auctions, place competitive bids, and manage the listings.",
      tags: ["Flask", "React", "PostgreSQL", "Docker", "Websockets"],
      link: "https://www.youtube.com/watch?v=zzumh5iMX88"
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <Card
              key={index}
              title={project.title}
              description={project.description}
              tags={project.tags}
              link={project.link}
              isExternal={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects; 