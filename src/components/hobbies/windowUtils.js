export const getInitialPosition = (index, total, containerDimensions) => {
  // 根据屏幕宽度调整窗口尺寸
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isVerySmall = typeof window !== 'undefined' && window.innerWidth < 480;
  const windowWidth = isVerySmall ? 200 : isMobile ? 240 : 300;
  const windowHeight = 300;
  
  const maxX = Math.max(0, containerDimensions.width - windowWidth);
  const maxY = Math.max(0, containerDimensions.height - windowHeight);

  // 计算网格布局 - 在移动端特别优化
  let cols, rows;
  if (isVerySmall) {
    cols = Math.min(3, total); // 非常小的屏幕最多3列
    rows = Math.ceil(total / cols);
  } else if (isMobile) {
    cols = Math.min(3, Math.ceil(Math.sqrt(total))); // 移动设备最多3列
    rows = Math.ceil(total / cols);
  } else {
    cols = Math.ceil(Math.sqrt(total)); // 桌面端按照总窗口数量的平方根计算列数
    rows = Math.ceil(total / cols);
  }
  
  const col = index % cols;
  const row = Math.floor(index / cols);

  // 计算网格间距 - 根据屏幕大小调整
  const gridWidth = maxX / (cols - 1 || 1);
  const gridHeight = maxY / (rows - 1 || 1);

  // 计算基础网格位置
  const baseX = gridWidth * col;
  const baseY = gridHeight * row;

  // 添加随机偏移（在移动端减小随机偏移范围）
  const offsetFactor = isVerySmall ? 0.15 : isMobile ? 0.25 : 0.6;
  const randomOffsetX = (Math.random() - 0.5) * gridWidth * offsetFactor;
  const randomOffsetY = (Math.random() - 0.5) * gridHeight * offsetFactor;

  // 计算最终位置
  const x = Math.max(0, Math.min(baseX + randomOffsetX, maxX));
  const y = Math.max(0, Math.min(baseY + randomOffsetY, maxY));

  // 计算速度 - 在移动端使用较小的速度
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