"use client";
import React from "react";
import Image from "next/image";
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const Logo = ({ isFooter = false }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="flex justify-center items-center">
      <div className="text-2xl md:text-3xl font-bold tracking-tighter text-solarized-blue dark:text-solarized-blue">
        LYL
      </div>
    </div>
  );
};

export default Logo;
