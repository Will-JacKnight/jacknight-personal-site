import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ColorInheritIcon from './ColorInheritIcon';
import '../styles/NavBar.css';

function NavBar({ onThemeToggle }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const isDarkMode = document.documentElement.classList.contains('dark-mode');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-content">
        <Link to="/" className="nav-logo">
          <ColorInheritIcon 
            src="/icons/&.svg" 
            className="logo-icon"
            width="24" 
            height="24" 
          />
          <span>Jacknight&</span>
        </Link>
        <div className="nav-links">
          <Link to="/projects">Projects</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/about">About</Link>
          <button 
            className="theme-toggle" 
            onClick={onThemeToggle}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              // Sun icon for dark mode
              <svg className="sun-icon" viewBox="0 0 24 24" width="20" height="20">
                <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2"/>
                <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2"/>
                <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2"/>
              </svg>
            ) : (
              // Moon icon for light mode
              <svg className="moon-icon" viewBox="0 0 24 24" width="20" height="20">
                <path 
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar; 