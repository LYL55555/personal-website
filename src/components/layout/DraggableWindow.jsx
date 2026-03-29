"use client";
import React, { useState, useRef, useEffect } from 'react';
import Draggable from "react-draggable";
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const DraggableWindow = React.memo(
  ({ title, children, defaultPosition, bounds, onStart, onStop, onDrag, position, onClose, className }) => {
    const nodeRef = useRef(null);
    const { isDarkMode } = useTheme();
    const [windowSize, setWindowSize] = useState({ width: 300, height: 'auto' });

    // 检测窗口尺寸并相应调整
    useEffect(() => {
      const updateSize = () => {
        // 进一步缩小移动端窗口大小，使其能够容纳更多窗口
        let width = 300;
        if (window.innerWidth < 768) {
          width = 240;
        }
        if (window.innerWidth < 480) {
          width = 200;
        }
        setWindowSize({ width, height: 'auto' });
      };
      
      updateSize();
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
      <Draggable
        defaultPosition={defaultPosition}
        position={position}
        bounds={bounds}
        nodeRef={nodeRef}
        onStart={(e) => {
          // 只允许从标题栏拖拽
          const target = e.target;
          const isHeader = target.closest('[data-handle="true"]');
          if (!isHeader) {
            return false;
          }
          onStart?.(e);
        }}
        onStop={onStop}
        onDrag={onDrag}
        grid={[1, 1]} // 添加1像素的网格对齐
        scale={1} // 确保缩放比例为1
      >
        <div
          ref={nodeRef}
          className={`
            absolute rounded-lg shadow-lg overflow-hidden
            transition-colors duration-300
            ${isDarkMode ? 
              'bg-gray-800 text-white border border-gray-700' : 
              'bg-white text-gray-900 border border-gray-200'
            }
            ${className}
          `}
          style={{
            transition: 'box-shadow 0.3s ease',
            cursor: 'default',
            userSelect: 'none',
            width: `${windowSize.width}px`,
            height: windowSize.height
          }}
        >
          {/* 窗口顶部 - 添加data-handle属性标识可拖拽区域 */}
          <div
            data-handle="true"
            className={`
              flex justify-between items-center px-2 sm:px-3 py-1 sm:py-1.5 cursor-move
              ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}
            `}
          >
            <h3 className="text-xs font-medium select-none truncate">{title}</h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose?.();
              }}
              className={`
                p-1 rounded-full text-base leading-none
                ${isDarkMode ? 
                  'hover:bg-gray-600 text-gray-400 hover:text-white' : 
                  'hover:bg-gray-200 text-gray-500 hover:text-gray-700'
                }
              `}
              aria-label="Close window"
            >
              ×
            </button>
          </div>

          {/* 窗口内容 */}
          <div className="p-2 sm:p-3">{children}</div>
        </div>
      </Draggable>
    );
  }
);

DraggableWindow.displayName = "DraggableWindow";

export default DraggableWindow;
