import '../styles/Projects.css';
import Card from './Card';

function Projects() {
  const projects = [
    {
      title: "Quality-Diversity Reinforcement Learning for Damage Recovery in Robotics",
      description: "A deep reinforcement learning-based research to enable robots to recover from unexpected mechanical damages in a handful of minutes.",
      tags: ["Reinforcement Learning", "Robotics", "Python"],
      // link: "#/projects",
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
      description: "Developed an online driving condition recognition algorithm using Time Convolutional Networks (TCN) to accurately classify real-time driving conditions.\
                Designed a condition-adaptive energy management strategy, demonstrated lower overall energy consumption across varying driving scenarios.",
      tags: ["Reinforcement Learning", "DDPG", "TCN", "Pytorch"],
      // link: "#/projects"
    },
    {
      title: "Variational Autoencoder-based Driving Condition Generation",
      description: "Developed a driving cycle generation algorithm using a Variational Autoencoder (VAE) to create a representative driving condition database, \
                enabling a lower-cost alternative to real-world data collection while maintaining accuracy and diversity in driving conditions.",
      tags: ["Variational Autoencoder", "LSTM", "PCA", "Pytorch"],
      // link: "#/projects"
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-posts">
          {projects.map((project, index) => (
            <Card
              key={index}
              title={project.title}
              description={project.description}
              tags={project.tags}
              link={project.link}
              isExternal={true}
              highlight={project.highlight}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects; 