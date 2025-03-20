import { useRef, useEffect } from 'react';

function Home() {
  const mossRef = useRef(null);
  const saihojiRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '-50px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (mossRef.current) observer.observe(mossRef.current);
    if (saihojiRef.current) observer.observe(saihojiRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section id="home" className="hero-section">
        <div className="title-container">
          <h1>Simplify & Improve</h1>
          <p>Welcome to Jacknight's personal website.</p>
        </div>
        
        <div className="scroll-indicator">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </div>
      </section>

      <section className="images-section">
        <div ref={mossRef} className="image-container">
          <img src="/images/Moss.jpg" alt="Moss Garden" className="hero-image" />
          <p className="image-caption">Enchanting Moss Garden</p>
        </div>

        <div ref={saihojiRef} className="image-container">
          <img src="/images/Saihoji.jpg" alt="Saihoji Temple" className="hero-image" />
          <p className="image-caption">Saihoji Temple - The Moss Temple</p>
        </div>
      </section>
    </>
  );
}

export default Home; 