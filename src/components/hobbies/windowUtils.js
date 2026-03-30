export const getInitialPosition = (index, total, containerDimensions) => {
  // Window footprint from breakpoint
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isVerySmall = typeof window !== 'undefined' && window.innerWidth < 480;
  const windowWidth = isVerySmall ? 200 : isMobile ? 240 : 300;
  const windowHeight = 300;
  
  const maxX = Math.max(0, containerDimensions.width - windowWidth);
  const maxY = Math.max(0, containerDimensions.height - windowHeight);

  // Grid columns: fewer on mobile
  let cols, rows;
  if (isVerySmall) {
    cols = Math.min(3, total);
    rows = Math.ceil(total / cols);
  } else if (isMobile) {
    cols = Math.min(3, Math.ceil(Math.sqrt(total)));
    rows = Math.ceil(total / cols);
  } else {
    cols = Math.ceil(Math.sqrt(total));
    rows = Math.ceil(total / cols);
  }
  
  const col = index % cols;
  const row = Math.floor(index / cols);

  // Cell spacing inside playfield
  const gridWidth = maxX / (cols - 1 || 1);
  const gridHeight = maxY / (rows - 1 || 1);

  // Grid anchor
  const baseX = gridWidth * col;
  const baseY = gridHeight * row;

  // Jitter within cell (smaller on phones)
  const offsetFactor = isVerySmall ? 0.15 : isMobile ? 0.25 : 0.6;
  const randomOffsetX = (Math.random() - 0.5) * gridWidth * offsetFactor;
  const randomOffsetY = (Math.random() - 0.5) * gridHeight * offsetFactor;

  // Clamp inside bounds
  const x = Math.max(0, Math.min(baseX + randomOffsetX, maxX));
  const y = Math.max(0, Math.min(baseY + randomOffsetY, maxY));

  // Initial drift magnitude
  const velocityFactor = isVerySmall ? 0.1 : isMobile ? 0.15 : 0.5;
  
  return {
    position: {
      x,
      y
    },
    velocity: {
      x: (Math.random() - 0.5) * velocityFactor,
      y: (Math.random() - 0.5) * velocityFactor
    },
    isDragging: false,
    isVisible: true
  };
};

export const getWindowTitle = (id) => {
  switch(id) {
    case 'photography': return "Photography";
    case 'music': return "Music";
    case 'pet': return "Pet";
    case 'travel': return "Travel";
    case 'fitness': return "Fitness";
    case 'anime': return "Anime";
    case 'art': return "Art";
    case 'volunteer': return "Volunteer";
    default: return "";
  }
}; 