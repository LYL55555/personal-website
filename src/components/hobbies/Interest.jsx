"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import DraggableWindow from "@/components/layout/DraggableWindow";
import { useTheme } from '@/context/ThemeContext';
import WindowContent from './WindowContent';
import { getInitialPosition, getWindowTitle } from './windowUtils';

const Interests = ({ containerRef }) => {
  const { isDarkMode } = useTheme();
  const [windows, setWindows] = useState(null);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0
  });
  const [isMobile, setIsMobile] = useState(false);
  const isInitializedRef = useRef(false);
  const previousDimensionsRef = useRef({ width: 0, height: 0 });
  
  // Debounce helper
  const debounce = useCallback((func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }, []);

  // Mobile breakpoint
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Measure playfield below navbar
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const viewportHeight = window.innerHeight;
        const navbarHeight = 64;
        const availableHeight = viewportHeight - navbarHeight;
        
        const newDimensions = {
          width: containerRef.current.offsetWidth,
          height: availableHeight
        };

        setContainerDimensions(newDimensions);
      }
    };

    const debouncedUpdateDimensions = debounce(updateDimensions, 100);
    updateDimensions();
    window.addEventListener('resize', debouncedUpdateDimensions);
    return () => window.removeEventListener('resize', debouncedUpdateDimensions);
  }, [containerRef, debounce]);

  // Scale window positions on resize
  useEffect(() => {
    if (!windows || !containerDimensions.width || !containerDimensions.height) return;

    const { width: prevWidth, height: prevHeight } = previousDimensionsRef.current;
    if (prevWidth === 0 && prevHeight === 0) {
      previousDimensionsRef.current = containerDimensions;
      return;
    }

    if (prevWidth !== containerDimensions.width || prevHeight !== containerDimensions.height) {
      const scaleX = containerDimensions.width / prevWidth;
      const scaleY = containerDimensions.height / prevHeight;
      
      // Window chrome width: 280 narrow mobile, else 300
      const windowWidth = window.innerWidth < 480 ? 280 : 300;
      const windowHeight = 300;

      setWindows(prevWindows => 
        prevWindows.map(win => ({
          ...win,
          position: {
            x: Math.min(Math.floor(win.position.x * scaleX), containerDimensions.width - windowWidth),
            y: Math.min(Math.floor(win.position.y * scaleY), containerDimensions.height - windowHeight)
          }
        }))
      );

      previousDimensionsRef.current = containerDimensions;
    }
  }, [containerDimensions]);

  // Seed floating windows once layout is known
  useEffect(() => {
    if (isInitializedRef.current || !containerDimensions.width || !containerDimensions.height) return;

    // Show every interest window on all breakpoints
    const windowIds = ['photography', 'music', 'pet', 'travel', 'fitness', 'anime', 'art', 'volunteer'];
    
    setWindows(
      windowIds.map((id, index) => ({
        ...getInitialPosition(index, windowIds.length, containerDimensions),
        id,
        // Gentler drift on mobile
        velocity: {
          x: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.5),
          y: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.5)
        }
      }))
    );
    
    isInitializedRef.current = true;
    previousDimensionsRef.current = containerDimensions;
  }, [containerDimensions, isMobile]);

  // Bounce windows inside the playfield
  useEffect(() => {
    if (!windows || !containerDimensions.width || !containerDimensions.height) return;

    let animationFrameId;
    const windowWidth = window.innerWidth < 480 ? 280 : 300;
    const windowHeight = 300;

    const updatePositions = () => {
      const speedFactor = isMobile ? 0.6 : 1;

      setWindows(prevWindows => 
        prevWindows.map(win => {
          if (win.isDragging || !win.isVisible) return win;

          // Apply speed damping on mobile
          const adjustedVelocityX = win.velocity.x * speedFactor;
          const adjustedVelocityY = win.velocity.y * speedFactor;

          // Integrate position from velocity
          const newLeft = win.position.x + adjustedVelocityX;
          const newRight = newLeft + windowWidth;
          const newTop = win.position.y + adjustedVelocityY;
          const newBottom = newTop + windowHeight;

          let newVelocityX = win.velocity.x;
          let newVelocityY = win.velocity.y;

          // Horizontal bounce
          if (newLeft <= 0 || newRight >= containerDimensions.width) {
            newVelocityX = -win.velocity.x;
          }
          
          // Vertical bounce (navbar 64px already excluded from height; reserve 16px footer pad)
          const minTop = 0;
          const maxBottom = containerDimensions.height - 16;
          if (newTop <= minTop || newBottom >= maxBottom) {
            newVelocityY = -win.velocity.y;
          }

          // Clamp inside bounds
          const boundedX = Math.max(0, Math.min(newLeft, containerDimensions.width - windowWidth));
          const boundedY = Math.max(minTop, Math.min(newTop, maxBottom - windowHeight));

          return {
            ...win,
            position: {
              x: boundedX,
              y: boundedY
            },
            velocity: {
              x: newVelocityX,
              y: newVelocityY
            }
          };
        })
      );

      animationFrameId = requestAnimationFrame(updatePositions);
    };

    animationFrameId = requestAnimationFrame(updatePositions);
    return () => cancelAnimationFrame(animationFrameId);
  }, [windows, containerDimensions, isMobile]);

  const handleDragStart = useCallback((id) => {
    setWindows(prevWindows =>
      prevWindows.map(win =>
        win.id === id ? { ...win, isDragging: true } : win
      )
    );
  }, []);

  const handleDragStop = useCallback((id) => {
    setWindows(prevWindows =>
      prevWindows.map(win =>
        win.id === id ? { ...win, isDragging: false } : win
      )
    );
  }, []);

  const handleDrag = useCallback((id, data) => {
    // Window size from breakpoint
    const isVerySmall = typeof window !== 'undefined' && window.innerWidth < 480;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const windowWidth = isVerySmall ? 200 : isMobile ? 240 : 300;
    const windowHeight = 300;
    
    const maxBottom = containerDimensions.height - 16;
    
    setWindows(prevWindows =>
      prevWindows.map(win =>
        win.id === id
          ? {
              ...win,
              position: {
                x: Math.max(0, Math.min(data.x, containerDimensions.width - windowWidth)),
                y: Math.max(0, Math.min(data.y, maxBottom - windowHeight))
              }
            }
          : win
      )
    );
  }, [containerDimensions]);

  const handleClose = useCallback((id) => {
    setWindows(prevWindows =>
      prevWindows.map(win =>
        win.id === id ? { ...win, isVisible: false } : win
      )
    );
  }, []);

  // Reset: respawn every window
  const handleReset = useCallback(() => {
    isInitializedRef.current = false;
    setWindows(null);
  }, []);

  if (!windows) return null;

  return (
    <div 
      className={`
        w-full 
        h-full
        pb-16 
        relative 
        transition-colors 
        duration-300
        ${isDarkMode ? 'bg-solarized-base03' : 'bg-solarized-base3'}
      `}
      style={{
        height: `${containerDimensions.height}px`,
      }}
    >
      {/* Mobile reset control */}
      {isMobile && (
        <button 
          onClick={handleReset}
          className={`
            absolute top-2 right-2 z-50
            px-3 py-1 
            text-xs
            rounded-md
            ${isDarkMode 
              ? 'bg-solarized-base02 text-solarized-base1 hover:bg-[#114454]' 
              : 'bg-solarized-base2 text-solarized-base01 hover:bg-[#e0d6bc]'
            }
            transition-colors duration-200
          `}
        >
          Reset Windows
        </button>
      )}
      
      {windows.map((window) => (
        window.isVisible && (
          <DraggableWindow
            key={window.id}
            title={getWindowTitle(window.id)}
            defaultPosition={window.position}
            bounds="parent"
            onStart={() => handleDragStart(window.id)}
            onStop={() => handleDragStop(window.id)}
            onDrag={(e, data) => handleDrag(window.id, data)}
            position={window.position}
            onClose={() => handleClose(window.id)}
            className={`${isDarkMode ? 'bg-solarized-base02 text-solarized-base1' : 'bg-solarized-base2 text-solarized-base01'}`}
          >
            <WindowContent id={window.id} />
          </DraggableWindow>
        )
      ))}
    </div>
  );
};

export default Interests;
