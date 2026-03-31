"use client";
import { useState, Fragment } from "react";
import Image from "next/image";
import TimelineDynamics from "@/components/experience/TimelineDynamics";
import { useTheme } from "@/context/ThemeContext";
import { educationData } from "@/data/educationData";
import {
  FaGraduationCap,
  FaCalendarAlt,
  FaBook,
  FaChevronDown,
  FaChevronRight,
  FaFlask,
  FaBriefcase,
  FaLaptopCode,
  FaPalette,
  FaCode,
  FaServer,
  FaDatabase,
  FaBrain,
  FaShieldAlt,
  FaChartLine,
  FaSearch,
  FaChalkboardTeacher,
} from "react-icons/fa";
import {
  BsAward,
  BsSearch,
  BsFileText,
  BsQuote,
  BsInfoCircle,
} from "react-icons/bs";
import { GiAchievement, GiTeacher } from "react-icons/gi";
import { MdOutlineRecommend } from "react-icons/md";

/** Display as Prof. Lastname; optional "Prof." prefix in source data. */
function profDisplayName(name) {
  const raw = name.replace(/^Prof\.\s*/i, "").trim();
  return raw ? `Prof. ${raw}` : "";
}

const cardStyle = (isDarkMode) => `
  p-4 rounded-lg
  ${
    isDarkMode
      ? "bg-[#1a1f24] hover:bg-[#1f252c]"
      : "bg-[#f0f0f0] hover:bg-[#e6e6e6]"
  }
  ${
    isDarkMode
      ? "shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
      : "shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
  }
`;

const TabDataContent = ({ activeTab }) => {
  const { isDarkMode } = useTheme();
  const [expandedNonCS, setExpandedNonCS] = useState({});
  const [expandedTeaching, setExpandedTeaching] = useState({});

  const toggleNonCS = (index) => {
    setExpandedNonCS((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleTeaching = (eduIndex, expIndex) => {
    const key = `${eduIndex}-${expIndex}`;
    setExpandedTeaching((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const TAB_DATA = [
    {
      title: "Experience",
      id: "experience",
      content: (
        <div className="flex flex-col items-center justify-center w-full overflow-visible min-h-[500px]">
          <TimelineDynamics />
        </div>
      ),
    },
    {
      title: "Education",
      id: "education",
      content: (
        <div className="flex flex-col items-center justify-start w-full max-w-2xl mx-auto px-4 sm:px-6">
          <div className="w-full flex flex-col gap-2" role="list">
            {educationData.map((edu, index) => (
              <Fragment key={index}>
                <div
                  className={`${cardStyle(
                    isDarkMode,
                  )} transform transition-all duration-300 hover:translate-x-2 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:transform-none`}
                  role="listitem"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FaGraduationCap
                      className={`text-xl ${
                        isDarkMode ? "text-[#58a6ff]" : "text-[#2075c7]"
                      }`}
                    />
                    <h3
                      className={`text-lg font-bold
                    ${isDarkMode ? "text-white" : "text-[#002b36]"}`}
                      id={`degree-${index}`}
                    >
                      {edu.degree}
                    </h3>
                  </div>

                  <div className={`text-sm font-semibold mb-2 ${isDarkMode ? "text-[#58a6ff]" : "text-[#2075c7]"}`}>
                    {edu.institution} {edu.location && `| ${edu.location}`}
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <FaCalendarAlt
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-[#586e75]"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-[#586e75]"
                      }`}
                      aria-label="Study period"
                    >
                      {edu.period}
                    </span>
                    <GiAchievement
                      className={`text-base ${
                        isDarkMode ? "text-[#58a6ff]" : "text-[#2075c7]"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium
                    ${isDarkMode ? "text-[#58a6ff]" : "text-[#2075c7]"}`}
                      aria-label="Grade Point Average"
                    >
                      GPA: {edu.gpa}
                    </span>
                  </div>

                  {Object.entries(edu.courses || {}).length > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FaBook
                          className={`text-sm ${
                            isDarkMode ? "text-gray-300" : "text-[#586e75]"
                          }`}
                        />
                        <h4
                          className={`text-sm font-semibold
                      ${isDarkMode ? "text-gray-300" : "text-[#586e75]"}`}
                          id={`courses-${index}`}
                        >
                          Key Courses
                        </h4>
                      </div>
                      <div
                        className="pl-6 space-y-1.5"
                        role="list"
                        aria-labelledby={`courses-${index}`}
                      >
                        {Object.entries(edu.courses).map(
                          ([category, courses], categoryIdx) => (
                            <div key={categoryIdx} className="space-y-0.5">
                              {category !== "Key Courses" && (
                                <h4
                                  className={`text-xs font-semibold uppercase tracking-wide mb-0.5 flex items-center gap-1 ${
                                    isDarkMode ? "text-gray-400" : "text-gray-600"
                                  }`}
                                >
                                  {category ===
                                    "Core Programming & Software Engineering" && (
                                    <FaCode className="text-xs" />
                                  )}
                                  {category === "Systems & Architecture" && (
                                    <FaServer className="text-xs" />
                                  )}
                                  {category === "Data & Web Technologies" && (
                                    <FaDatabase className="text-xs" />
                                  )}
                                  {category === "Algorithms & Theory" && (
                                    <FaChartLine className="text-xs" />
                                  )}
                                  {category === "AI & Machine Learning" && (
                                    <FaBrain className="text-xs" />
                                  )}
                                  {category === "Networking & Security" && (
                                    <FaShieldAlt className="text-xs" />
                                  )}
                                  {category === "Graphics & Visualization" && (
                                    <FaPalette className="text-xs" />
                                  )}
                                  {category ===
                                    "Research & Special Projects" && (
                                    <FaSearch className="text-xs" />
                                  )}
                                  {category === "Graphics & Research" && (
                                    <FaPalette className="text-xs" />
                                  )}
                                  {category === "Big Data & Analytics" && (
                                    <FaDatabase className="text-xs" />
                                  )}
                                  {category === "Computer Vision & AI" && (
                                    <FaBrain className="text-xs" />
                                  )}
                                  {category === "Machine Learning & AI" && (
                                    <FaBrain className="text-xs" />
                                  )}
                                  {category === "IoT & Emerging Technologies" && (
                                    <FaLaptopCode className="text-xs" />
                                  )}
                                  {category === "Research & Seminars" && (
                                    <FaSearch className="text-xs" />
                                  )}
                                  {category === "Software Engineering" && (
                                    <FaCode className="text-xs" />
                                  )}
                                  {category === "Statistics" && (
                                    <FaChartLine className="text-xs" />
                                  )}
                                  {category}
                                </h4>
                              )}
                              <div className="grid grid-cols-1 gap-0">
                                {courses.map((course, courseIdx) => (
                                  <div
                                    key={courseIdx}
                                    className={`text-xs py-0 px-2 rounded relative w-full min-w-0
                                ${
                                  isDarkMode
                                    ? "bg-[#232930] text-gray-300"
                                    : "bg-[#e6e6e6] text-[#586e75]"
                                }
                                before:content-[''] before:absolute before:left-[-0.5rem] before:top-1/2 before:h-1 before:w-1 before:-translate-y-1/2 before:rounded-full
                                ${
                                  isDarkMode
                                    ? "before:bg-gray-500"
                                    : "before:bg-[#93a1a1]"
                                }`}
                                    role="listitem"
                                  >
                                    {typeof course === "string"
                                      ? course
                                      : course.achievement
                                        ? (() => {
                                            const achievementFull =
                                              typeof course.achievement ===
                                              "string"
                                                ? course.achievement
                                                : [
                                                    course.achievement.summary,
                                                    course.achievement.detail,
                                                  ]
                                                    .filter(Boolean)
                                                    .join(". ");
                                            const achievementBadge =
                                              typeof course.achievement ===
                                              "string"
                                                ? course.achievement.length > 40
                                                  ? `${course.achievement.slice(
                                                      0,
                                                      38,
                                                    )}…`
                                                  : course.achievement
                                                : course.achievement.summary;
                                            return (
                                              <div className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5 leading-tight">
                                                <span>{course.name}</span>
                                                {course.instructor && (
                                                  <span
                                                    className={`inline-flex max-w-full items-center gap-1 rounded border px-1.5 py-0 leading-none ${
                                                      isDarkMode
                                                        ? "border-[#30363d]/90 bg-[#0d1117]/70"
                                                        : "border-[#d0d7de] bg-white/50"
                                                    }`}
                                                  >
                                                    <FaChalkboardTeacher
                                                      className={`h-2.5 w-2.5 shrink-0 translate-y-px ${
                                                        isDarkMode
                                                          ? "text-[#79c0ff]"
                                                          : "text-[#0969da]"
                                                      }`}
                                                      aria-hidden
                                                    />
                                                    <a
                                                      href={course.instructor.url}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className={`min-w-0 truncate text-xs font-medium underline decoration-1 underline-offset-1 hover:opacity-85 ${
                                                        isDarkMode
                                                          ? "text-[#58a6ff]"
                                                          : "text-[#0969da]"
                                                      }`}
                                                      title={profDisplayName(
                                                        course.instructor.name,
                                                      )}
                                                    >
                                                      {profDisplayName(
                                                        course.instructor.name,
                                                      )}
                                                    </a>
                                                  </span>
                                                )}
                                                <span
                                                  className={`inline-flex max-w-[min(100%,14rem)] items-center gap-0.5 rounded-full border px-1.5 py-px text-[10px] font-medium tabular-nums leading-none ${
                                                    isDarkMode
                                                      ? "border-[#58a6ff]/40 bg-[#58a6ff]/12 text-[#c8e1ff]"
                                                      : "border-[#2075c7]/35 bg-[#2075c7]/10 text-[#0c4a6e]"
                                                  }`}
                                                  title={achievementFull}
                                                  role="status"
                                                  aria-label={achievementFull}
                                                >
                                                  <BsAward
                                                    className={`h-2.5 w-2.5 shrink-0 opacity-90 ${
                                                      isDarkMode
                                                        ? "text-[#58a6ff]"
                                                        : "text-[#2075c7]"
                                                    }`}
                                                    aria-hidden
                                                  />
                                                  <span className="min-w-0 truncate">
                                                    {achievementBadge}
                                                  </span>
                                                </span>
                                              </div>
                                            );
                                          })()
                                        : (
                                            <div className="w-full min-w-0 leading-tight">
                                              <span className="align-middle">
                                                {course.name}
                                              </span>
                                            </div>
                                          )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  {edu.nonCSClasses && (
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => toggleNonCS(index)}
                        aria-expanded={expandedNonCS[index] || false}
                        aria-controls={`non-cs-${index}`}
                        aria-label={
                          expandedNonCS[index]
                            ? "Collapse non-computer-science courses"
                            : "Expand non-computer-science courses"
                        }
                        className={`flex w-full items-center gap-2 mb-2 rounded-md py-1 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 ${
                          isDarkMode
                            ? "hover:bg-white/[0.06] focus-visible:ring-solarized-blue/40"
                            : "hover:bg-black/[0.04] focus-visible:ring-solarized-blueUi/40"
                        }`}
                      >
                        <FaBook
                          className={`shrink-0 text-sm ${
                            isDarkMode ? "text-gray-300" : "text-[#586e75]"
                          }`}
                        />
                        <h4
                          className={`min-w-0 flex-1 text-sm font-semibold ${
                            isDarkMode ? "text-gray-300" : "text-[#586e75]"
                          }`}
                          id={`non-cs-heading-${index}`}
                        >
                          Non ComSci Courses
                        </h4>
                        <span
                          className={`flex shrink-0 items-center gap-1 text-xs ${
                            isDarkMode ? "text-gray-500" : "text-gray-500"
                          }`}
                          aria-hidden
                        >
                          {expandedNonCS[index] ? (
                            <FaChevronDown className="text-xs" />
                          ) : (
                            <FaChevronRight className="text-xs" />
                          )}
                        </span>
                      </button>
                      {expandedNonCS[index] && (
                        <div
                          id={`non-cs-${index}`}
                          className="pl-6 mb-4 space-y-1.5"
                          role="list"
                          aria-labelledby={`non-cs-heading-${index}`}
                        >
                          {Object.entries(edu.nonCSClasses).map(
                            ([category, courses], categoryIdx) => (
                              <div key={categoryIdx} className="space-y-0.5">
                                <h4
                                  className={`text-xs font-semibold uppercase tracking-wide mb-0.5 flex items-center gap-1 ${
                                    isDarkMode
                                      ? "text-gray-400"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {category === "Mathematics & Sciences" && (
                                    <FaFlask className="text-xs" />
                                  )}
                                  {category === "Business & Management" && (
                                    <FaBriefcase className="text-xs" />
                                  )}
                                  {category ===
                                    "Humanities & Social Sciences" && (
                                    <FaBook className="text-xs" />
                                  )}
                                  {category ===
                                    "Digital Humanities & Technology" && (
                                    <FaLaptopCode className="text-xs" />
                                  )}
                                  {category === "Arts & Culture" && (
                                    <FaPalette className="text-xs" />
                                  )}
                                  {category}
                                </h4>
                                <div className="grid grid-cols-1 gap-0">
                                  {courses.map((course, courseIdx) => (
                                    <div
                                      key={courseIdx}
                                      className={`relative w-full min-w-0 rounded px-2 py-0 text-xs
                                    ${
                                      isDarkMode
                                        ? "bg-[#232930] text-gray-300"
                                        : "bg-[#e6e6e6] text-[#586e75]"
                                    }
                                    before:absolute before:left-[-0.5rem] before:top-1/2 before:h-1 before:w-1 before:-translate-y-1/2 before:rounded-full before:content-['']
                                    ${
                                      isDarkMode
                                        ? "before:bg-gray-500"
                                        : "before:bg-[#93a1a1]"
                                    }`}
                                      role="listitem"
                                    >
                                      {course}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {edu.teachingExperience && (
                  <div
                    className={`${cardStyle(
                      isDarkMode,
                    )} transform transition-all duration-300 hover:translate-x-2 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:transform-none`}
                    role="listitem"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <GiTeacher
                        className={`text-xl ${
                          isDarkMode ? "text-[#58a6ff]" : "text-[#2075c7]"
                        }`}
                      />
                      <h3
                        className={`text-lg font-bold
                        ${isDarkMode ? "text-white" : "text-[#002b36]"}`}
                        id={`teaching-${index}`}
                      >
                        Teaching Experience
                      </h3>
                    </div>
                    <div
                      className="grid grid-cols-1 gap-0.5 pl-6"
                      role="list"
                      aria-labelledby={`teaching-${index}`}
                    >
                      {edu.teachingExperience.map((exp, idx) => {
                        const isExpanded = expandedTeaching[`${index}-${idx}`];
                        const hasRecommendation = Boolean(exp.recommendation);
                        return (
                          <div key={idx}>
                            <div
                              className={`text-sm py-1 px-2 rounded relative mb-0.5 cursor-pointer transition-all group
                                ${
                                  hasRecommendation
                                    ? isDarkMode
                                      ? "border border-[#58a6ff]/55 bg-[#1a2733] text-gray-200 shadow-[0_0_12px_-4px_rgba(88,166,255,0.35)] hover:border-[#58a6ff]/80"
                                      : "border border-[#2075c7]/45 bg-[#eff6ff] text-[#334155] shadow-sm hover:border-[#2075c7]/70"
                                    : isDarkMode
                                      ? "bg-transparent text-gray-300 hover:bg-white/[0.06]"
                                      : "bg-transparent text-[#586e75] hover:bg-black/[0.04]"
                                }
                                before:content-[''] before:absolute before:left-[-0.75rem] before:top-1/2 before:-translate-y-1/2
                                before:w-1.5 before:h-1.5 before:rounded-full
                                ${
                                  hasRecommendation
                                    ? isDarkMode
                                      ? "before:bg-[#58a6ff] before:shadow-[0_0_6px_#58a6ff]"
                                      : "before:bg-[#2075c7]"
                                    : isDarkMode
                                      ? "before:bg-gray-500"
                                      : "before:bg-[#93a1a1]"
                                }`}
                              role="listitem"
                              title={
                                hasRecommendation
                                  ? "Includes sample recommendation"
                                  : undefined
                              }
                              onClick={() => toggleTeaching(index, idx)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="text-xs font-semibold flex items-center gap-1">
                                  {exp.course}
                                  {exp.details && (
                                    <BsInfoCircle className="text-xs text-blue-500 opacity-60" />
                                  )}
                                  {exp.recommendation && (
                                    <MdOutlineRecommend
                                      className={`text-xs ${
                                        isDarkMode
                                          ? "text-[#58a6ff]"
                                          : "text-[#0969da]"
                                      }`}
                                      title="Has recommendation snippet"
                                    />
                                  )}
                                </div>
                                {exp.details && (
                                  <div
                                    className="flex items-center gap-1"
                                    title="Click to expand details"
                                  >
                                    {isExpanded ? (
                                      <FaChevronDown className="text-xs text-blue-500 group-hover:scale-110 transition-transform" />
                                    ) : (
                                      <FaChevronRight className="text-xs text-blue-500 group-hover:scale-110 transition-transform" />
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mb-0">
                                {exp.period ? (
                                  <>
                                    <span
                                      className={`text-xs ${
                                        isDarkMode
                                          ? "text-gray-400"
                                          : "text-[#586e75]"
                                      }`}
                                    >
                                      {exp.period}
                                    </span>
                                    <span
                                      className={
                                        isDarkMode
                                          ? "text-gray-400"
                                          : "text-[#94a3b8]"
                                      }
                                    >
                                      ·
                                    </span>
                                  </>
                                ) : (
                                  <span
                                    className={
                                      isDarkMode
                                        ? "text-gray-400"
                                        : "text-[#94a3b8]"
                                    }
                                  >
                                    ·
                                  </span>
                                )}
                                <span
                                  className={`text-xs font-medium px-2 py-0.5 rounded
                                  ${
                                    isDarkMode
                                      ? "bg-[#58a6ff]/20 text-[#58a6ff]"
                                      : "bg-[#2075c7]/20 text-[#2075c7]"
                                  }`}
                                >
                                  {exp.role}
                                </span>
                              </div>
                            </div>
                            {exp.details && isExpanded && (
                              <div className="ml-6 mt-1 mb-2">
                                <ul className="text-xs space-y-1">
                                  {exp.details.map((detail, detailIdx) => (
                                    <li
                                      key={detailIdx}
                                      className={`flex items-start gap-2 ${
                                        isDarkMode
                                          ? "text-gray-400"
                                          : "text-[#586e75]"
                                      }`}
                                    >
                                      <span className="text-gray-500 mt-0.5 flex-shrink-0">
                                        •
                                      </span>
                                      <span className="flex-1">{detail}</span>
                                    </li>
                                  ))}
                                </ul>
                                {exp.recommendation && (
                                  <div
                                    className={`mt-3 p-4 rounded-lg border shadow-md transition-all duration-300 hover:shadow-lg
                                     ${
                                       isDarkMode
                                         ? "bg-[#0d1117] border-[#30363d] hover:bg-[#161b22]"
                                         : "bg-white border-[#d0d7de] hover:bg-[#f6f8fa]"
                                     }`}
                                  >
                                    <div
                                      className={`text-sm font-semibold mb-3 flex items-center gap-2
                                      ${
                                        isDarkMode
                                          ? "text-[#58a6ff]"
                                          : "text-[#0969da]"
                                      }
                                    `}
                                    >
                                      <MdOutlineRecommend className="text-lg" />
                                      Professor Recommendation
                                    </div>
                                    <div
                                      className={`text-sm leading-relaxed mb-3
                                      ${
                                        isDarkMode
                                          ? "text-[#e6edf3]"
                                          : "text-[#24292f]"
                                      }
                                    `}
                                    >
                                      {exp.recommendation.text}
                                    </div>
                                    {exp.recommendation.summary && (
                                      <div
                                        className={`text-sm italic mb-3 p-2 rounded border-l-4
                                         ${
                                           isDarkMode
                                             ? "text-[#8b949e] bg-[#21262d] border-[#58a6ff]"
                                             : "text-[#57606a] bg-[#f1f3f4] border-[#0969da]"
                                         }
                                       `}
                                      >
                                        {exp.recommendation.summary}
                                      </div>
                                    )}
                                    <div className="mt-3">
                                      <Image
                                        src={exp.recommendation.image}
                                        alt="Professor Recommendation"
                                        width={400}
                                        height={300}
                                        className={`rounded-lg border-2 max-w-full h-auto shadow-sm
                                          ${
                                            isDarkMode
                                              ? "border-[#30363d] hover:border-[#58a6ff]"
                                              : "border-[#d0d7de] hover:border-[#0969da]"
                                          }
                                        `}
                                        onError={(e) => {
                                          e.target.style.display = "none";
                                        }}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {edu.researchExperience && (
                  <div
                    className={`${cardStyle(
                      isDarkMode,
                    )} transform transition-all duration-300 hover:translate-x-2 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:transform-none`}
                    role="listitem"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <BsSearch
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-[#586e75]"
                        }`}
                      />
                      <h4
                        className={`text-sm font-semibold
                        ${isDarkMode ? "text-gray-300" : "text-[#586e75]"}`}
                        id={`research-${index}`}
                      >
                        Research Experience
                      </h4>
                    </div>
                    <div
                      className="grid grid-cols-1 gap-[0.5rem] pl-6"
                      role="list"
                      aria-labelledby={`research-${index}`}
                    >
                      {edu.researchExperience.map((exp, idx) => (
                        <div
                          key={idx}
                          className={`text-sm py-[0.4rem] px-2 rounded relative
                            ${
                              isDarkMode
                                ? "bg-[#232930] text-gray-300"
                                : "bg-[#e6e6e6] text-[#586e75]"
                            }
                            before:content-[''] before:absolute before:left-[-0.75rem] before:top-1/2 before:-translate-y-1/2
                            before:w-1.5 before:h-1.5 before:rounded-full
                            ${
                              isDarkMode
                                ? "before:bg-gray-500"
                                : "before:bg-[#93a1a1]"
                            }`}
                          role="listitem"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{exp.title}</span>
                            <span
                              className={`text-xs font-medium ml-2 px-2 py-0.5 rounded
                              ${
                                isDarkMode
                                  ? "bg-[#58a6ff]/20 text-[#58a6ff]"
                                  : "bg-[#2075c7]/20 text-[#2075c7]"
                              }`}
                            >
                              {exp.period}
                            </span>
                          </div>
                          <div
                            className={`text-xs mt-1 mb-2
                            ${
                              isDarkMode ? "text-[#58a6ff]" : "text-[#2075c7]"
                            }`}
                          >
                            {exp.supervisor}
                          </div>
                          <div className="space-y-2">
                            <div className="text-xs space-y-1">
                              {exp.description.map((desc, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <span className="min-w-[6px]">•</span>
                                  <span>{desc}</span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-2">
                              <div className="flex items-center text-xs">
                                <span
                                  className={`font-medium
                                  ${
                                    isDarkMode
                                      ? "text-gray-400"
                                      : "text-[#586e75]"
                                  }`}
                                >
                                  Tools:&nbsp;
                                </span>
                                <span
                                  className={`
                                  ${
                                    isDarkMode
                                      ? "text-[#58a6ff]"
                                      : "text-[#2075c7]"
                                  }`}
                                >
                                  {Object.values(exp.technologies)
                                    .flat()
                                    .join(" | ")}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Certifications",
      id: "certifications",
      content: (
        <div className="flex flex-col justify-center items-start max-w-lg mx-auto">
          <ul
            className={`list-disc pl-4 flex flex-col items-start leading-relaxed space-y-4
                         ${isDarkMode ? "text-[#ADB7BE]" : "text-[#586e75]"}`}
          >
            <li>
              <div className="font-bold text-lg">Dean's Honors</div>
              <div className="text-sm opacity-80 italic">UCLA</div>
              <div className="text-sm">Academic excellence award for undergraduate studies.</div>
            </li>
            <li>
              <div className="font-bold text-lg">Specialization in Machine Learning</div>
              <div className="text-sm opacity-80 italic">Stanford Online (Instructor: Andrew Ng)</div>
              <div className="text-sm">Comprehensive study of ML, from foundations to advanced techniques.</div>
            </li>
            <li>
              <div className="font-bold text-lg">Optiver - Trading at the Close</div>
              <div className="text-sm opacity-80 italic">Competitions (Top 1.3%)</div>
              <div className="text-sm">Achieved top performance in high-frequency trading competition.</div>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Awards",
      id: "awards",
      content: (
        <div className="flex flex-col justify-center items-center">
          <ul
            className={`list-disc pl-4 text-center mt-4 space-y-2
                         ${isDarkMode ? "text-[#ADB7BE]" : "text-[#586e75]"}`}
          >
            <li>
              <div className="font-bold text-lg">The President's Volunteer Service Award - Gold</div>
              <div className="text-sm">Recognized for 300+ hours of volunteering and community service.</div>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return TAB_DATA.find((t) => t.id === activeTab)?.content ?? null;
};

export default TabDataContent;
