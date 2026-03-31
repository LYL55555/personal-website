"use client";
import dynamic from "next/dynamic";
import SectionTitle from "@/components/ui/SectionTitle";
import { useTheme } from "@/context/ThemeContext";
import SimpleListSection from "@/components/ui/SimpleListSection";
import Image from "next/image";

const ProjectsSection = dynamic(
  () => import("@/components/projects/ProjectsSection"),
  {
    loading: () => <div>Loading...</div>,
    ssr: false,
  }
);

const AboutSection = dynamic(() => import("@/components/about/AboutSection"), {
  loading: () => <div>Loading...</div>,
});

const ExperienceSection = dynamic(() => import("@/components/experience/TimelineDynamics"), {
  loading: () => <div>Loading...</div>,
});

const EmailSection = dynamic(
  () => import("@/components/contact/EmailSection"),
  {
    loading: () => <div>Loading...</div>,
  }
);

export default function Home() {
  const { isDarkMode } = useTheme();

  const researchItems = [
    {
      title: "Shaanxi Key Lab of BDKE, Xi'an Jiaotong Univ | Advisor: Yannan Chen",
      subtitle: "Mar. 2025 - Present",
      description:
        "• Dual-Generalization-Aware Minimization (ECCV 2026 Under Review, Co-First Author): proposed dual-space flatness optimization for continual fine-tuning of VLMs, preserving zero-shot generalization while reducing catastrophic forgetting.\n• FLAD Framework (AAAI 2026): decomposed sharpness into gradient-aligned and noise-driven components to improve stability-plasticity tradeoff under fixed budgets.",
    },
    {
      title: "CNTR Lab, Brown DSI | Advisor: Rui-Jie Yew",
      subtitle: "Sep. 2025 - Dec. 2025",
      description:
        "• AI Policy Red Teaming (ACM 2025): extended taxonomy of AI policy avoision; designed LLM experiments on scope, exemptions, and incentives with reproducibility constraints.",
    },
    {
      title: "Mobility Lab, UCLA | Advisor: Jiaqi Ma",
      subtitle: "Jan. 2025 - Sep. 2025",
      description:
        "• MIC-BEV (ICCV 2025, Best Paper Award): built relation-aware BEV transformer for multi-camera 3D detection with strong real/sim performance.\n• Data Desensitization: developed face/license plate anonymization pipeline (+90% F1).\n• 3D Detection & Trajectory: designed interpolation and trajectory prediction on LiDAR to improve annotation efficiency.",
    },
    {
      title: "Trustworthy AI Lab, UCLA | Advisor: Guang Cheng",
      subtitle: "Jan. 2024 - Jan. 2025",
      description:
        "• Watermarking Synthetic Data (arXiv): embedded fractional-digit signals for verifiable tabular data generation.\n• Consistency Models for Synthetic Data: replaced diffusion with consistency models for faster, privacy-preserving generation.\n• Class Imbalance: evaluated generative vs. non-generative methods under extreme imbalance (1.5% vs. 98.5%).",
    },
  ];

  const publicationItems = [
    {
      title: "Time Series Analysis of the COVID-19 Impact on the US Airline Companies Based on ARMA model",
      subtitle: "Yanle Lyu | ICCIR",
      description: "Statistical analysis of the pandemic's impact on aviation markets using time series forecasting.",
      link: "https://dl.acm.org/doi/epdf/10.1145/3473714.3473806",
    },
    {
      title: "Dual-Generalization-Aware Minimization for Continual Fine-Tuning of VLMs",
      subtitle: "Shaanxi Key Lab of BDKE (Shaanxi Jiaotong Univ) | Advisor: Yannan Chen | Under Review at ECCV 2026, Co-First Author",
      description:
        "Proposed a dual-space flatness optimization method for continual fine-tuning of vision–language models that preserves zero-shot generalization while reducing catastrophic forgetting across benchmarks.",
    },
  ];

  const leadershipItems = [
    {
      title: "President, Chinese Bruins Union (UCLA Division)",
      subtitle: "Jan 2022 - Jun 2025 | Los Angeles, CA",
      description: "Led 120+ team members, organized events for 1200+ students, and secured $30k+ annual sponsorships. Assisted in the transition to 501(c)(3) Non-Profit.",
    },
    {
      title: "President's Volunteer Service Award - Gold",
      subtitle: "Honors & Awards",
      description: "Recognized for 300+ hours of volunteering and community service.",
    },
    {
      title: "Dean's Honors",
      subtitle: "UCLA",
      description: "Academic excellence award for undergraduate studies.",
    },
    {
      title: "Specialization in Machine Learning (Stanford Online)",
      subtitle: "Certifications",
      description: "Instructor: Andrew Ng",
    },
    {
      title: "Optiver - Trading at the Close (Top 1.3%)",
      subtitle: "Competitions",
      description: "Achieved top performance in high-frequency trading competition.",
    },
  ];

  const photographyItems = [
    { id: 1, src: "/images/main-pic.JPG", alt: "Tony Lyu photography portfolio" },
  ];

  return (
    <main
      className={`flex min-h-screen flex-col text-solarized-base01 dark:text-solarized-base1 ${
        isDarkMode ? "bg-solarized-base03" : "bg-solarized-base3"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 mt-16 sm:mt-20 md:mt-24">
        <div id="about" className="mt-8 sm:mt-12 scroll-mt-24">
          <SectionTitle title="About Me" />
          <AboutSection />
        </div>

        <div id="experience" className="mt-16 sm:mt-20 scroll-mt-24">
          <SectionTitle title="Experience" />
          <ExperienceSection />
        </div>

        <div id="research" className="mt-16 sm:mt-20 scroll-mt-24">
          <SimpleListSection id="research" title="Research" items={researchItems} />
        </div>

        <div id="projects" className="mt-16 sm:mt-20 scroll-mt-24">
          <SectionTitle title="My Projects" />
          <ProjectsSection />
        </div>

        <div id="publications" className="mt-16 sm:mt-20 scroll-mt-24">
          <SimpleListSection id="publications" title="Publications" items={publicationItems} />
        </div>

        <div id="leadership" className="mt-16 sm:mt-20 scroll-mt-24">
          <SimpleListSection id="leadership" title="Leadership" items={leadershipItems.filter(item => !["Dean's Honors", "Specialization in Machine Learning (Stanford Online)", "Optiver - Trading at the Close (Top 1.3%)"].includes(item.title))} />
        </div>

        <div id="contact" className="mt-16 sm:mt-20 mb-16 sm:mb-24 scroll-mt-24">
          <SectionTitle title="Contact Me" />
          <EmailSection />
        </div>
      </div>
    </main>
  );
}
