import '../styles/About.css';

function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p className="about-intro">
              Hi, I'm Jack. I'm now a postgraduate in Computing at Imperial College London.
            </p>
            <div className="about-details">
              <div className="about-subsection">
                <h3>Background</h3>
                <p>
                  A Mechanical Engineering graduate, a software developer and a machine learning enthusiast. Had some experience with project management, more happy to build products.
                </p>
              </div>
              <div className="about-subsection">
                <h3>Philosophy</h3>
                <p>
                  Good products speak for themselves. Our job is to make them heard.
                </p>
              </div>
              <div className="about-subsection">
                <h3>Current Focus</h3>
                <p>
                  Currently exploring machine learning applications and large scale software,
                  with a particular interest in creating sustainable and scalable solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About; 