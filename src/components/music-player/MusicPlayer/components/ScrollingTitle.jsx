import { useScrollingText } from '../hooks/useScrollingText';

const ScrollingTitle = ({ title, isDarkMode }) => {
  const { elementRef, isOverflow, shouldAnimate, setShouldAnimate } = useScrollingText(title);

  return (
    <div 
      ref={elementRef}
      className={`text-sm md:text-sm font-medium mb-1 text-center md:text-left whitespace-nowrap overflow-hidden ${
        isDarkMode ? 'text-solarized-base1' : 'text-solarized-base01'
      }`}
    >
      <div
        className={`inline-block ${shouldAnimate ? 'animate-marquee' : ''}`}
        style={{
          animation: shouldAnimate ? 'marquee 15s linear infinite' : 'none',
          paddingRight: isOverflow ? '50px' : '0'
        }}
        onAnimationEnd={() => setShouldAnimate(false)}
      >
        {title}
      </div>
    </div>
  );
};

export default ScrollingTitle; 