"use client";
import "./about-section-theme.css";
import { useTransition, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TabButton from "@/components/ui/TabButton";
import TabDataContent from "@/data/tabData";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { MdWork } from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import { FaGraduationCap, FaCertificate, FaTrophy } from "react-icons/fa";

const AboutSection = () => {
  const [tab, setTab] = useState("experience");
  const [isPending, startTransition] = useTransition();
  const { isDarkMode } = useTheme();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section
      id="about"
      className={`flex flex-col gap-6 sm:gap-8 relative items-center ${
        isDarkMode ? "dark-theme" : "light-theme"
      }`}
    >
      <div className="flex flex-col items-center justify-center w-full max-w-5xl">
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 md:items-start">
          <div className="md:col-span-4 flex justify-center md:justify-start md:sticky md:top-24 shrink-0">
            <div className="w-full max-w-[300px] relative rounded-xl overflow-hidden theme-shadow ring-1 ring-black/[0.06] dark:ring-white/10">
            <Image
                src="/images/main-pic.JPG"
                alt="Profile photo"
                width={300}
                height={300}
                priority
                className="w-full h-auto rounded-xl transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
          </div>

          <div className="md:col-span-8 w-full min-w-0 max-w-3xl">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 sm:mb-5 theme-primary scroll-mt-24">
              About Me
            </h3>

            <div className="space-y-4 sm:space-y-5 text-sm sm:text-base lg:text-lg text-left leading-relaxed text-pretty theme-text">
              <p>
                I am an <span className="font-semibold text-solarized-blue">MS in Data Science</span> student at <span className="font-semibold">Brown University</span>. With a background in <span className="font-semibold">Mathematics, Economics, and Statistics</span> (and a <span className="font-semibold">CS specialization</span>) from <span className="font-semibold">UCLA</span>, I specialize in <span className="font-semibold italic text-solarized-blue">building AI systems</span> for <span className="font-medium text-solarized-blue">valuation intelligence</span>, <span className="font-medium text-solarized-blue">hybrid retrieval (RAG)</span>, and <span className="font-medium text-solarized-blue">trustworthy machine learning</span>.
              </p>

              <p>
                Currently, as a <span className="font-semibold text-solarized-blue">Machine Learning Engineer</span> at <a href="https://qandq.ai/" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-solarized-blue/30 hover:decoration-solarized-blue decoration-2 transition-all">Q&Q AI</a>, I develop <span className="font-semibold">LLM-driven pipelines</span> and <span className="font-semibold text-solarized-blue">agent systems</span> that <span className="italic">automate complex financial reasoning</span>. My research interests center on <span className="font-semibold text-solarized-blue">continual learning</span> and <span className="font-semibold text-solarized-blue">vision-language models (VLMs)</span>.
              </p>

              <p>
                Beyond work, I'm interested in <span className="font-medium">Formula 1 and karting</span>, and enjoy <span className="font-medium">music and photography</span> during travel, often capturing systems and patterns not just in data, but in the real world.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full h-px my-8 theme-divider"></div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 w-full">
          <TabButton
            selectTab={() => handleTabChange("experience")}
            active={tab === "experience"}
          >
            <span className="flex items-center gap-1.5">
              <MdWork className="text-lg" />
              <span>Experience</span>
            </span>
          </TabButton>
          <TabButton
            selectTab={() => handleTabChange("education")}
            active={tab === "education"}
          >
            <span className="flex items-center gap-1.5">
              <FaGraduationCap className="text-lg" />
              <span>Education</span>
            </span>
          </TabButton>
          <TabButton
            selectTab={() => handleTabChange("certifications")}
            active={tab === "certifications"}
          >
            <span className="flex items-center gap-1.5">
              <FaCertificate className="text-lg" />
              <span>Certifications</span>
            </span>
          </TabButton>
          <TabButton
            selectTab={() => handleTabChange("awards")}
            active={tab === "awards"}
          >
            <span className="flex items-center gap-1.5">
              <FaTrophy className="text-lg" />
              <span>Awards</span>
            </span>
          </TabButton>
        </div>

        <motion.div
          className="mt-6 sm:mt-8 w-full p-4 sm:p-6 rounded-xl theme-card theme-shadow theme-border border"
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TabDataContent activeTab={tab} />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
