import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaMapMarkedAlt, FaExchangeAlt } from 'react-icons/fa';

const SearchBox = ({ onSearch }) => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  // Sample location data based on the floor plan
  const locations = [
    { id: 'bme-large', name: 'BME Large Classroom (1041)', x: 350, y: 50, floor: '1st Floor' },
    { id: 'bme-small', name: 'BME Small Classroom (2005)', x: 550, y: 168, floor: '2nd Floor' },
    { id: 'bme-offices', name: 'BME Dept. Offices', x: 675, y: 185, floor: '2nd Floor' },
    { id: 'papin', name: 'Papin Lab', x: 815, y: 50, floor: '1st Floor' },
    { id: 'meyer', name: 'Meyer Lab', x: 900, y: 50, floor: '1st Floor' },
    { id: 'foyer', name: 'BME 1st Floor Foyer', x: 150, y: 200, floor: '1st Floor' },
    { id: 'student-lounge', name: 'BME Student Lounge (1042)', x: 450, y: 200, floor: '1st Floor' },
    { id: 'atrium', name: 'BME 2nd Floor Atrium', x: 655, y: 203, floor: '2nd Floor' },
    { id: 'shared-lab', name: 'Shared Lab Space', x: 795, y: 280, floor: '2nd Floor' },
    { id: 'kubelick', name: 'Kubelick Lab', x: 450, y: 280, floor: '1st Floor' },
    { id: 'griffin', name: 'Griffin Lab', x: 450, y: 320, floor: '1st Floor' },
    { id: 'french', name: 'French Lab', x: 450, y: 420, floor: '1st Floor' },
    { id: 'sheybani', name: 'Sheybani Lab', x: 450, y: 470, floor: '1st Floor' },
    { id: 'abebayehu', name: 'Abebayehu Lab', x: 450, y: 520, floor: '1st Floor' },
    { id: 'christ1', name: 'Christ Lab #1', x: 450, y: 570, floor: '1st Floor' },
    { id: 'christ2', name: 'Christ Lab #2', x: 450, y: 620, floor: '1st Floor' },
    { id: 'papin2', name: 'Papin Lab #2', x: 795, y: 356, floor: '2nd Floor' },
    { id: 'price1', name: 'Price Lab #1', x: 795, y: 435, floor: '2nd Floor' },
    { id: 'price2', name: 'Price Lab #2', x: 795, y: 500, floor: '2nd Floor' },
    { id: 'zunder', name: 'Zunder Lab', x: 795, y: 565, floor: '2nd Floor' },
    { id: 'barker', name: 'Barker Lab', x: 795, y: 630, floor: '2nd Floor' },
    { id: 'peirce1', name: 'Peirce-Cottler Lab #1', x: 795, y: 700, floor: '2nd Floor' },
    { id: 'lazzara1', name: 'Lazzara Lab #1', x: 795, y: 770, floor: '2nd Floor' },
    { id: 'lazzara2', name: 'Lazzara Lab #2', x: 795, y: 835, floor: '2nd Floor' },
    { id: 'peirce2', name: 'Peirce-Cottler Lab #2', x: 820, y: 310, floor: '2nd Floor' },
    { id: 'saucerman1', name: 'Saucerman Lab #1', x: 825, y: 356, floor: '2nd Floor' },
    { id: 'saucerman2', name: 'Saucerman Lab #2', x: 825, y: 435, floor: '2nd Floor' },
    { id: 'fallahi1', name: 'Fallahi-Sachini Lab #1', x: 825, y: 500, floor: '2nd Floor' },
    { id: 'fallahi2', name: 'Fallahi-Sachini Lab #2', x: 825, y: 565, floor: '2nd Floor' },
    { id: 'janes1', name: 'Janes Lab #1', x: 825, y: 630, floor: '2nd Floor' },
    { id: 'janes2', name: 'Janes Lab #2', x: 825, y: 700, floor: '2nd Floor' },
    { id: 'blemker', name: 'Blemker Lab', x: 825, y: 770, floor: '2nd Floor' },
    { id: 'epstein', name: 'Epstein Lab', x: 825, y: 825, floor: '2nd Floor' },
  ];
  
  // Group locations by floor
  const locationsByFloor = locations.reduce((acc, location) => {
    const floor = location.floor;
    if (!acc[floor]) {
      acc[floor] = [];
    }
    acc[floor].push(location);
    return acc;
  }, {});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Find the selected locations
    const startLocation = locations.find(loc => loc.id === start);
    const endLocation = locations.find(loc => loc.id === end);
    
    if (startLocation && endLocation) {
      setIsSearching(true);
      
      // Simulate a slight delay for better UX
      setTimeout(() => {
        onSearch(startLocation, endLocation);
        setIsSearching(false);
      }, 500);
    }
  };
  
  const swapLocations = () => {
    setStart(end);
    setEnd(start);
  };
  
  return (
    <div className="search-box">
      <div className="search-header">
        <FaMapMarkedAlt className="search-icon" />
        <h2>Find Your Way</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="search-container">
          <div className="input-group">
            <label htmlFor="start-location">Start:</label>
            <div className="select-wrapper">
              <select 
                id="start-location"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                required
                disabled={isSearching}
              >
                <option value="">Select starting point</option>
                {Object.entries(locationsByFloor).map(([floor, locations]) => (
                  <optgroup key={floor} label={floor}>
                    {locations.map(location => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>
          
          <button 
            type="button" 
            className="swap-button"
            onClick={swapLocations}
            disabled={!start || !end || isSearching}
            aria-label="Swap locations"
          >
            <FaExchangeAlt />
          </button>
          
          <div className="input-group">
            <label htmlFor="end-location">Destination:</label>
            <div className="select-wrapper">
              <select 
                id="end-location"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                required
                disabled={isSearching}
              >
                <option value="">Select destination</option>
                {Object.entries(locationsByFloor).map(([floor, locations]) => (
                  <optgroup key={floor} label={floor}>
                    {locations.map(location => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <motion.button 
          type="submit"
          className="search-button"
          disabled={!start || !end || isSearching}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSearching ? (
            <span className="button-text">
              <span className="spinner"></span>
              Finding Route...
            </span>
          ) : (
            <span className="button-text">
              <FaSearch />
              Get Directions
            </span>
          )}
        </motion.button>
      </form>
      
      <style jsx>{`
        .search-box {
          background-color: var(--card-bg);
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
        }
        
        .search-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-color);
        }
        
        .search-icon {
          color: var(--primary-color);
          font-size: 1.25rem;
        }
        
        .search-header h2 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-color);
        }
        
        .search-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
          position: relative;
        }
        
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        label {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
        }
        
        .select-wrapper {
          position: relative;
        }
        
        .select-wrapper::after {
          content: '';
          position: absolute;
          top: 50%;
          right: 1rem;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid var(--text-secondary);
          pointer-events: none;
        }
        
        select {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background-color: var(--input-bg);
          color: var(--text-color);
          font-size: 1rem;
          appearance: none;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        
        select:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px var(--primary-light);
        }
        
        select:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .swap-button {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: var(--primary-color);
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s;
          z-index: 1;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        
        .swap-button:hover:not(:disabled) {
          background-color: var(--primary-dark);
        }
        
        .swap-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .search-button {
          width: 100%;
          padding: 0.875rem 1.5rem;
          background-color: var(--primary-color);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .search-button:hover:not(:disabled) {
          background-color: var(--primary-dark);
        }
        
        .search-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .button-text {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        @media (min-width: 768px) {
          .search-container {
            flex-direction: row;
            align-items: center;
          }
          
          .input-group {
            flex: 1;
          }
          
          .swap-button {
            position: static;
            transform: none;
            flex-shrink: 0;
            margin: 0 0.5rem;
            margin-top: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchBox;