import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark-mode');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <motion.div 
            className="logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >

            <h1>Navigating MR5</h1>
          </motion.div>
        </div>
        
        <div className="actions">
          <button 
            className="theme-toggle"
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .header {
          width: 100%;
          padding: 1rem;
          background-color: var(--card-bg);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo-container {
          display: flex;
          align-items: center;
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .logo h1 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-color);
          margin: 0;
        }
        
        .actions {
          display: flex;
          gap: 1rem;
        }
        
        .theme-toggle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: transparent;
          border: none;
          color: var(--text-color);
          font-size: 1.25rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .theme-toggle:hover {
          background-color: var(--hover-color);
        }
        
        @media (max-width: 768px) {
          .logo h1 {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;