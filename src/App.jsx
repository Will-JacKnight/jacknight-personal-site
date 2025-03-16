import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <NavBar onThemeToggle={toggleTheme} />
      <main className="content">
        <section id="home" className="hero-section">
          <h1>Welcome to My Personal Page</h1>
          <p>This is my React-powered personal website.</p>
        </section>
        {/* Add more sections here */}
      </main>
    </div>
  )
}

export default App 