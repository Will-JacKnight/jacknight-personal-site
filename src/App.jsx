import { useState, useEffect, useRef } from 'react'
import NavBar from './components/NavBar'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import './styles/App.css'
import mossImage from './assets/Moss.jpg'
import saihojiImage from './assets/Saihoji.jpg'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const mossRef = useRef(null);
  const saihojiRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

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

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <NavBar onThemeToggle={toggleTheme} />
      <main className="content">
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
            <img src={mossImage} alt="Moss Garden" className="hero-image" />
            <p className="image-caption">Enchanting Moss Garden</p>
          </div>

          <div ref={saihojiRef} className="image-container">
            <img src={saihojiImage} alt="Saihoji Temple" className="hero-image" />
            <p className="image-caption">Saihoji Temple - The Moss Temple</p>
          </div>
        </section>

        <About />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}

export default App 