"use client";
import React from "react";
import HeroTextContent from "./HeroTextContent";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="py-4 sm:py-8">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 sm:gap-12 place-items-center max-w-6xl mx-auto px-4">
        <div className="col-span-12 sm:col-span-7">
          <HeroTextContent />
        </div>
        <div className="col-span-12 sm:col-span-5 flex justify-center w-full">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-solarized-blue/20 dark:border-solarized-blue/10 transform hover:scale-[1.02] transition-transform duration-300">
            <Image
              src="/images/avatar-placeholder.svg" // 你之后可以把这个路径换成你自己的照片，比如 /images/tony.jpg
              alt="Yanle (Tony) Lyu"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
