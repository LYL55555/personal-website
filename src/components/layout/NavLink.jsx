"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

const NavLink = ({ href, title }) => {
  const pathname = usePathname();
  const { isDarkMode } = useTheme();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`block py-2 pl-3 pr-4 sm:text-xl rounded md:p-0 transition-colors duration-300
                 ${
                   isActive
                     ? isDarkMode
                       ? "text-solarized-base1"
                       : "text-solarized-base03"
                     : isDarkMode
                       ? "text-solarized-base0 hover:text-solarized-base1"
                       : "text-solarized-base01 hover:text-solarized-base03"
                 }`}
    >
      {title}
    </Link>
  );
};

export default NavLink;
