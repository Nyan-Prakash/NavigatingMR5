import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Map = ({ startLocation, endLocation, path, path2, onLoad }) => {
  const mapRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!mapRef.current) return;
    
    const canvas = mapRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the floor plan
    const img = new Image();
    img.src = '/floorplan.jpg';
    img.onload = () => {
      setIsLoading(false);
      if (onLoad) onLoad();
      
      // Draw the floor plan image with a slight zoom
      const scale = 1.05;
      const scaledWidth = canvas.width * scale;
      const scaledHeight = canvas.height * scale;
      const offsetX = (canvas.width - scaledWidth) / 2;
      const offsetY = (canvas.height - scaledHeight) / 2;
      
      ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
      
      // Add subtle grid overlay
      drawGrid(ctx, canvas.width, canvas.height);
      

      // Draw the path if it exists
      if (path && path.length > 1) {
        // Draw path shadow
        ctx.strokeStyle = 'rgba(235, 37, 37, 0.3)';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        drawPath(ctx, path, canvas.width, canvas.height);
        
        // Draw main path
        ctx.strokeStyle = 'rgba(235, 37, 37, 0.9)';
        ctx.lineWidth = 8;
        drawPath(ctx, path, canvas.width, canvas.height);
      }



      if (path2 && path2.length > 1) {
        // Draw path shadow
        ctx.strokeStyle = 'rgba(235, 37, 37, 0.3)';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        drawPath(ctx, path2, canvas.width, canvas.height);
        
        // Draw main path
        ctx.strokeStyle = 'rgba(235, 37, 37, 0.9)';
        ctx.lineWidth = 8;
        drawPath(ctx, path2, canvas.width, canvas.height);
      }
      
      // Draw start and end markers
      if (startLocation) {
        drawMarker(ctx, startLocation.x, startLocation.y, '#10B981', 'Start', canvas.width, canvas.height);
      }
      
      if (endLocation) {
        drawMarker(ctx, endLocation.x, endLocation.y, '#EF4444', 'End', canvas.width, canvas.height);
      }


        drawMarker(ctx, 385, 880,'#2563EB', 'Stairs', canvas.width, canvas.height);
      
        drawMarker(ctx, 900, 900, '#2563EB', 'Stairs', canvas.width, canvas.height);
      
    };
  }, [startLocation, endLocation, path, onLoad]);
  
  // Helper function to draw grid
  function drawGrid(ctx, width, height) {
    ctx.strokeStyle = 'rgba(209, 213, 219, 0.2)';
    ctx.lineWidth = 0.5;
    
    // Draw vertical lines
    for (let x = 0; x <= width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Draw horizontal lines
    for (let y = 0; y <= height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }
  
  // Helper function to draw path
  function drawPath(ctx, path, canvasWidth, canvasHeight) {
    const scaleX = canvasWidth / 1000;
    const scaleY = canvasHeight / 1000;
    
    ctx.beginPath();
    
    path.forEach((point, index) => {
      const x = point.x * scaleX;
      const y = point.y * scaleY;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
  }
  
  // Helper function to draw markers
  function drawMarker(ctx, x, y, color, label, canvasWidth, canvasHeight) {
    const scaleX = canvasWidth / 1000;
    const scaleY = canvasHeight / 1000;
    
    const scaledX = x * scaleX;
    const scaledY = y * scaleY;
    
    // Draw outer circle (pulse effect would be added with animation in a real app)
    ctx.fillStyle = `${color}33`;
    ctx.beginPath();
    ctx.arc(scaledX, scaledY, 18, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw inner circle
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(scaledX, scaledY, 10, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw text background
    const textWidth = ctx.measureText(label).width + 16;
    const textHeight = 24;
    
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(scaledX - textWidth / 2, scaledY - 36, textWidth, textHeight, 12);
    ctx.fill();
    
    // Draw border
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(scaledX - textWidth / 2, scaledY - 36, textWidth, textHeight, 12);
    ctx.stroke();
    
    // Draw text
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 12px Inter';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, scaledX, scaledY - 24);
  }
  
  return (
    <div className="map-wrapper">
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Loading map...</p>
        </div>
      )}
      
      <canvas 
        ref={mapRef}
        width={1000}
        height={700}
        className="map-canvas"
      />
      
      <style jsx>{`
        .map-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          background-color: var(--card-bg);
        }
        
        .map-canvas {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        
        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: var(--card-bg);
          z-index: 10;
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left-color: var(--primary-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Map;