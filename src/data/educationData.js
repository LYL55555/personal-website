"use client";

const RESPONSIBILITIES = {
  READER: "Grading assignments and providing feedback to students",
  TA: "Leading discussion sections, holding office hours, and grading assignments",
  TEST_SCRIPT_DEV:
    "Developing and maintaining test scripts for course assignments",
  WEB_DEV: "Developing and maintaining course web infrastructure",
};

const validateTeachingExperience = (exp) => {
  const requiredFields = ["course", "role", "period", "responsibilities"];
  return requiredFields.every((field) => exp[field] !== undefined);
};

/** Template data — replace with your real education. Fictional school: Carrot Valley Institute (Usagi theme). */
export const educationData = [
  {
    degree: "M.S. in Computer Science (Example)",
    period: "09/2024 - 06/2026",
    gpa: "4.00/4.00",
    courses: {
      "Systems & Backend": [
        {
          name: "CS 501 - Distributed Systems (Example)",
          instructor: {
            name: "Dr. Jordan Sample",
            url: "https://example.edu/faculty/jordan-sample",
          },
        },
        {
          name: "CS 502 - Applied Machine Learning (Example)",
          instructor: {
            name: "Dr. Alex Example",
            url: "https://example.edu/faculty/alex-example",
          },
        },
      ],
      "Software Engineering": [
        {
          name: "CS 510 - Software Engineering Studio (Example)",
          instructor: {
            name: "Prof. Taylor Demo",
            url: "https://example.edu/faculty/taylor-demo",
          },
        },
      ],
      "Research & Seminars": [
        "CS 590 - Graduate Seminar (Example)",
        "CS 599 - Directed Study (Example)",
      ],
    },
    teachingExperience: [
      {
        course: "CS 201 - Data Structures (Example)",
        role: "Teaching Assistant",
        period: "Winter 2025",
        professor: "Prof. Jordan Sample",
        responsibilities: RESPONSIBILITIES.TA,
        details: [
          "Led discussion sections and held weekly office hours.",
          "Graded assignments with clear rubrics and timely feedback.",
        ],
      },
    ].map((exp) => {
      if (!validateTeachingExperience(exp)) {
        console.warn(
          `Invalid teaching experience data: ${JSON.stringify(exp)}`,
        );
      }
      return exp;
    }),
  },
  {
    degree: "B.S. in Computer Science (Example)",
    period: "09/2020 - 06/2024",
    gpa: "3.85/4.00",
    courses: {
      "Core Programming": [
        {
          name: "CS 101 - Introduction to Programming",
          instructor: {
            name: "Dr. Alex Example",
            url: "https://example.edu/faculty/alex-example",
          },
        },
        {
          name: "CS 201 - Data Structures",
          instructor: {
            name: "Dr. Jordan Sample",
            url: "https://example.edu/faculty/jordan-sample",
          },
        },
      ],
      "Electives": [
        "CS 301 - Web Development Workshop (Example)",
        "CS 401 - Capstone Project (Example)",
      ],
    },
  },
];
