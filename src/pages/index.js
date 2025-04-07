import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import useWindowSize from '@/hooks/useWindowSize';

// Dynamically import components to avoid SSR issues with canvas
const Map = dynamic(() => import('@/components/Map'), { ssr: false });
const NavigationPanel = dynamic(() => import('@/components/NavigationPanel'));
const SearchBox = dynamic(() => import('@/components/SearchBox'));

export default function Home() {
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [path, setPath] = useState([]);
  const [path2, setPath2] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const handleSearch = (start, end) => {
    setStartLocation(start);
    setEndLocation(end);
    
    // Calculate path and instructions
    const {path, path2, instructions } = calculateRoute(start, end);
    console.log("Path2: " + path2);
    console.log("Path: " + path);

    setPath(path);
    setPath2(path2);
    setInstructions(instructions);
  };

  return (
    <div className="app-container">
      <Head>
        <title>Navigating MR5 | Interactive Hospital Navigation</title>
        <meta name="description" content="Interactive navigation system for MR5 Hospital" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="main-content">
        <motion.div 
          className="content-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isMobile ? (
            <>
              <div className="search-container">
                <SearchBox onSearch={handleSearch} />
              </div>
              
              <div className="map-container">
                <Map 
                  startLocation={startLocation}
                  endLocation={endLocation}
                  path={path}
                  path2={path2}
                  onLoad={() => setIsMapLoaded(true)}
                />
              </div>
              
              {instructions.length > 0 && (
                <div className="navigation-container">
                  <NavigationPanel instructions={instructions} />
                </div>
              )}
            </>
          ) : (
            <div className="desktop-layout">
              <div className="left-panel">
                <SearchBox onSearch={handleSearch} />
                <NavigationPanel instructions={instructions} />
              </div>
              <div className="right-panel">
                <Map 
                  startLocation={startLocation}
                  endLocation={endLocation}
                  path={path}
                  onLoad={() => setIsMapLoaded(true)}
                />
              </div>
            </div>
          )}
        </motion.div>
      </main>

      <style jsx>{`
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: var(--bg-color);
          color: var(--text-color);
        }

        .main-content {
          flex: 1;
          padding: 1rem;
          display: flex;
          justify-content: center;
        }

        .content-wrapper {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
        }

        .search-container {
          margin-bottom: 1rem;
        }

        .map-container {
          width: 100%;
          height: 60vh;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          margin-bottom: 1rem;
          background-color: var(--card-bg);
        }

        .navigation-container {
          margin-top: 1rem;
        }

        .desktop-layout {
          display: flex;
          gap: 1.5rem;
          height: calc(100vh - 150px);
        }

        .left-panel {
          width: 30%;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          overflow-y: auto;
        }

        .right-panel {
          flex: 1;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          background-color: var(--card-bg);
        }

        @media (max-width: 768px) {
          .main-content {
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}

// Helper function to calculate route
function calculateRoute(start, end) {

    var path = [
      { x: start.x, y: start.y },
      { x: 800, y: start.y},
      { x: 800, y: end.y},
      { x: end.x, y: end.y }
    ];

    var path2 = [
      { x: start.x, y: start.y },
      { x: 800, y: start.y},
      { x: 800, y: end.y},
      { x: end.x, y: end.y }
    ];
  
  //First to first
  
  if(start.x < 499 && end.x < 499)
  {
    
    path = [
      { x: start.x, y: start.y },
      { x: 807, y: start.y},
      { x: 807, y: end.y},
      { x: end.x, y: end.y }
    ];
    
  }

  //Second to second
  else if (start.x > 500 && end.x > 500)
  {
    path = [
      { x: start.x, y: start.y },
      { x: 810, y: start.y},
      { x: 810, y: end.y},
      { x: end.x, y: end.y }
    ];
  }

  //first to second
  else if (start.x < 499 && end.x > 499)
  {
    path = [
      { x: start.x, y: start.y },
      { x: 307, y: start.y },
      { x: 307, y: 880 },
      { x: 385, y: 880 }
    ];

    path2 = [
      {x: 900, y: 900},
      {x: 900, y: 880 },
      {x: 810, y: 880 },
      { x: 810, y: end.y },
      { x: end.x, y: end.y }    
    ];
  }
    
  else if(start.x > 499 && end.x < 499)
  {
    
    path = [
      { x: start.x, y: start.y },
      { x: 810, y: start.y },
      { x: 810, y: 880 },
      { x: 900, y: 880 },
      { x: 900, y: 900},
    ];

    path2 = [
      { x: 385, y: 880 },
      { x: 307, y: 880 },
      { x: 307, y: end.y },
      { x: end.x, y: end.y },
    ];

      

  }

  
  
  const instructions = [
    `Start at ${start.name}`,
    `Walk straight ahead for about ${Math.round(Math.abs((start.x + end.x) / 2 - start.x))} feet`,
    `Turn ${end.y > start.y ? 'right' : 'left'} and walk for about ${Math.round(Math.abs(end.y - start.y))} feet`,
    `Turn ${end.x > (start.x + end.x) / 2 ? 'right' : 'left'} and walk for about ${Math.round(Math.abs(end.x - (start.x + end.x) / 2))} feet`,
    `You have arrived at ${end.name}`
  ];
  
  return { path, path2, instructions };
}