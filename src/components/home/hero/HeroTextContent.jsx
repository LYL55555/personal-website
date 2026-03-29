"use client";
import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

/** Gradient text matches `html.dark`; avoid ThemeContext for this block (hydration mismatch before mount). */
const helloGradientLight = {
  backgroundImage:
    "linear-gradient(90deg, #00212b 0%, #0f5494 42%, #7a5200 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

const helloGradientDark = {
  backgroundImage:
    "linear-gradient(90deg, #eee8d5 0%, #79c0ff 38%, #2aa198 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

const HeroTextContent = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full col-span-12 sm:col-span-6 lg:col-span-7 text-center sm:text-left"
    >
      <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-solarized-base03 dark:text-solarized-base3">
        <span className="sr-only">Hello, I&apos;m </span>
        <span
          className="relative inline-block min-h-[1.1em] align-bottom"
          aria-hidden="true"
        >
          <span className="invisible whitespace-pre">Hello, I&apos;m </span>
          <span
            className="absolute left-0 top-0 whitespace-pre opacity-100 transition-opacity duration-300 ease-out dark:opacity-0"
            style={helloGradientLight}
          >
            Hello, I&apos;m{" "}
          </span>
          <span
            className="absolute left-0 top-0 whitespace-pre opacity-0 transition-opacity duration-300 ease-out dark:opacity-100"
            style={helloGradientDark}
          >
            Hello, I&apos;m{" "}
          </span>
        </span>
        <br className="hidden sm:block" />
        <TypeAnimation
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-solarized-base03 dark:text-solarized-base3"
          sequence={[
            "Usagi (Chiikawa)",
            1000,
            "Full Stack Developer",
            1000,
            "Creative Builder",
            1000,
            "Template Enjoyer",
            1000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </h1>
      <p className="text-sm sm:text-base lg:text-lg mb-6 max-w-[600px] mx-auto sm:mx-0 text-solarized-base00 dark:text-solarized-base1">
        A playful portfolio template — swap every line for your own introduction.
      </p>
      <div className="flex flex-col items-center sm:items-start">
        <Link
          href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 mt-3 rounded-full text-base sm:text-lg font-semibold text-solarized-base3 shadow-md hover:shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solarized-blue focus-visible:ring-offset-2 [background-size:100%_100%] border border-black/15 bg-[linear-gradient(90deg,#1d4ed8_0%,#c2410c_100%)] hover:bg-[linear-gradient(90deg,#1e3a8a_0%,#9a3412_100%)] focus-visible:ring-offset-solarized-base3 dark:border-white/20 dark:bg-[linear-gradient(90deg,#268bd2_0%,#cb4b16_100%)] dark:hover:bg-[linear-gradient(90deg,#2075c7_0%,#b85c0c_100%)] dark:focus-visible:ring-offset-solarized-base03"
        >
          Resume
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 sm:w-6 sm:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </Link>

        <div
          className="mt-4 inline-block relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <span className="text-xs font-medium text-solarized-blueUi dark:text-solarized-base1">
            <span className="animate-pulse">✨</span>
            The 3D model is{" "}
            <Link
              href="https://chiikawa.fandom.com/wiki/Usagi"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:underline text-solarized-base03 hover:text-solarized-blue dark:text-solarized-base3 dark:hover:text-solarized-cyan"
              title="Usagi (うさぎ) from Chiikawa (ちいかわ)"
            >
              Usagi
            </Link>
            {" "}
            <span className="font-normal opacity-90">from Chiikawa</span>
            <span className="animate-bounce inline-block">🐰</span>
          </span>

          <div
            className={`absolute top-full mt-2 left-0 z-10 transition-opacity duration-300 rounded-md py-1.5 px-3 text-xs max-w-[250px] ${
              showTooltip ? "opacity-100" : "opacity-0 pointer-events-none"
            } bg-solarized-base2 text-solarized-base01 border border-solarized-borderLight dark:bg-solarized-base02 dark:text-solarized-ghMuted dark:border-solarized-ghBorder`}
          >
            <span className="font-medium">Usagi</span> (うさぎ) is a character
            from Nagano&apos;s manga and anime{" "}
            <span className="font-medium">Chiikawa</span> (ちいかわ). This site
            uses them as a playful template mascot — swap for your own branding.
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroTextContent;
