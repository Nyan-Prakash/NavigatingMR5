import React from 'react';
import { motion } from 'framer-motion';
import { FaDirections, FaMapMarkerAlt, FaRegLightbulb, FaClock } from 'react-icons/fa';

const NavigationPanel = ({ instructions }) => {
  const hasInstructions = instructions && instructions.length > 0;
  
  return (
    <div className="navigation-panel">
      <div className="panel-header">
        <FaDirections className="panel-icon" />
        <h2>Directions</h2>
      </div>
      
      {hasInstructions ? (
        <motion.div 
          className="instructions-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="stats-row">
            <div className="stat-item">
              <FaMapMarkerAlt />
              <span>
                {instructions.length - 2} turns
              </span>
            </div>
            <div className="stat-item">
              <FaClock />
              <span>~{Math.ceil(estimateWalkingTime(instructions))} min</span>
            </div>
          </div>
          
          <div className="instructions-list">
            {instructions.map((instruction, index) => (
              <motion.div 
                key={index}
                className="instruction-item"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <div className="instruction-number">
                  <span>{index + 1}</span>
                </div>
                <div className="instruction-text">
                  {instruction}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="tip-box">
            <FaRegLightbulb className="tip-icon" />
            <p>If you need assistance, look for information desks on each floor or ask any staff member wearing a badge.</p>
          </div>
        </motion.div>
      ) : (
        <div className="empty-state">
          <p>Please select a start and end location to get directions.</p>
        </div>
      )}
      
      <style jsx>{`
        .navigation-panel {
          background-color: var(--card-bg);
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          height: 100%;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }
        
        .panel-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-color);
        }
        
        .panel-icon {
          color: var(--primary-color);
          font-size: 1.25rem;
        }
        
        .panel-header h2 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-color);
        }
        
        .stats-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          padding: 0.75rem;
          background-color: var(--bg-highlight);
          border-radius: 8px;
        }
        
        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
        }
        
        .instructions-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .instruction-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        
        .instruction-number {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--primary-color);
          color: white;
          border-radius: 50%;
          font-size: 0.875rem;
          font-weight: 600;
        }
        
        .instruction-text {
          flex: 1;
          line-height: 1.5;
          padding-top: 0.25rem;
          color: var(--text-color);
        }
        
        .tip-box {
          background-color: var(--bg-highlight);
          border-left: 3px solid var(--primary-color);
          padding: 1rem;
          border-radius: 0 8px 8px 0;
          display: flex;
          gap: 0.75rem;
        }
        
        .tip-icon {
          color: var(--primary-color);
          flex-shrink: 0;
          font-size: 1.25rem;
          margin-top: 0.125rem;
        }
        
        .tip-box p {
          margin: 0;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
        
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 1rem;
          text-align: center;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .navigation-panel {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

// Helper function to estimate walking time based on instructions
function estimateWalkingTime(instructions) {
  // Extract distance values from instructions and sum them
  const distanceRegex = /about (\d+) feet/g;
  let totalFeet = 0;
  
  instructions.forEach(instruction => {
    const matches = [...instruction.matchAll(distanceRegex)];
    matches.forEach(match => {
      totalFeet += parseInt(match[1], 10);
    });
  });
  
  // Average walking speed is about 4-5 feet per second
  const averageWalkingSpeed = 4.5; // feet per second
  const walkingTimeSeconds = totalFeet / averageWalkingSpeed;
  
  // Convert to minutes and add some buffer time for orientation
  return (walkingTimeSeconds / 60) + 0.5;
}

export default NavigationPanel;