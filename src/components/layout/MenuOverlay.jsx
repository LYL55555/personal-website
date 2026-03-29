"use client";
import React from "react";
import Link from "next/link";
import NavLink from "./NavLink";
import { useTheme } from '@/context/ThemeContext';

const MenuOverlay = ({ links }) => {
  const { isDarkMode } = useTheme();

  return (
    <ul className={`flex flex-col py-4 items-center transition-colors duration-300
                   ${isDarkMode ? 'bg-solarized-base03' : 'bg-solarized-base3'}`}>
      {links.map((link, index) => (
        <li key={index}>
          <NavLink href={link.path} title={link.title} />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
