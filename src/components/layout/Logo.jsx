"use client";
import React from "react";
import Image from "next/image";
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const Logo = ({ isFooter = false }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-16 h-16 md:w-20 md:h-20">
        <Image
          src="/images/logo-template.svg"
          alt="Site logo placeholder"
          fill
          sizes="(max-width: 768px) 64px, 80px"
          style={{ objectFit: "contain" }}
          className={`transition-opacity duration-300 ${isDarkMode ? 'opacity-100' : 'opacity-90'}`}
          priority
        />
      </div>
    </div>
  );
};

export default Logo;
