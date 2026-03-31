"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroTextContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full text-center sm:text-left"
    >
      <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-solarized-base03 dark:text-solarized-base3">
        Yanle (Tony) Lyu
      </h1>
      <p className="text-lg sm:text-xl lg:text-2xl mb-6 max-w-[800px] mx-auto sm:mx-0 text-solarized-base00 dark:text-solarized-base1 font-medium">
        MS in Data Science at Brown. Machine Learning Engineer at Q&Q AI. Building systems for Valuation Intelligence and Trustworthy ML.
      </p>
      <div className="flex flex-wrap items-center gap-4 sm:justify-start justify-center">
        <Link
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-base sm:text-lg font-semibold text-solarized-base3 shadow-md hover:shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solarized-blue focus-visible:ring-offset-2 bg-solarized-blue hover:bg-solarized-blue/90 dark:bg-solarized-blue dark:hover:bg-solarized-blue/80"
        >
          Resume
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </Link>
        
        <Link
          href="mailto:yanle_lyu@brown.edu"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-base sm:text-lg font-semibold border-2 border-solarized-blue text-solarized-blue hover:bg-solarized-blue hover:text-white transition-all duration-300 shadow-sm"
        >
          Email
        </Link>

        <Link
          href="https://linkedin.com/in/yanle-lyu"
          target="_blank"
          className="p-3 rounded-full border border-solarized-base1 hover:bg-solarized-base2 transition-all duration-300"
        >
           <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </Link>

        <Link
          href="https://github.com/your-username"
          target="_blank"
          className="p-3 rounded-full border border-solarized-base1 hover:bg-solarized-base2 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

export default HeroTextContent;
