"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from '@/context/ThemeContext';

const HeroImage = () => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="col-span-12 sm:col-span-6 lg:col-span-5 place-self-center mt-8 sm:mt-0"
    >
      <div className={`rounded-full w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[400px] lg:h-[400px] relative
                      ${isDarkMode ? 'bg-solarized-base02' : 'bg-solarized-base2'}`}>
        <Image
          src="/images/usagi-image.webp"
          alt="usagi image"
          className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          width={300}
          height={300}
          sizes="(max-width: 640px) 180px, (max-width: 1024px) 230px, 280px"
          priority
        />
      </div>
    </motion.div>
  );
};

export default HeroImage; 