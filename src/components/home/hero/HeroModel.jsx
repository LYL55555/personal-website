"use client";
import { useTheme } from '@/context/ThemeContext';
import { SceneContainer } from './model/SceneContainer';

const HeroModel = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="col-span-12 sm:col-span-6 lg:col-span-5 flex justify-center items-center w-full min-h-[300px] sm:min-h-0">
      <div className={`rounded-full w-[250px] h-[250px] sm:w-[250px] sm:h-[250px] lg:w-[400px] lg:h-[400px] relative
                    ${isDarkMode ? 'bg-solarized-base02' : 'bg-solarized-base3'}`}>
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <SceneContainer />
        </div>
      </div>
    </div>
  );
};

export default HeroModel; 