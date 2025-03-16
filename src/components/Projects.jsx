import '../styles/Projects.css';

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
            <div key={index} className="project-card">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="project-tag">{tag}</span>
                ))}
              </div>
              <a href={project.link} className="project-link">
                Learn More
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path d="M5 12h14M12 5l7 7-7 7" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects; 