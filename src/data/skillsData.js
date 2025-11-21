import {
  FaPhp,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaWordpress,
  FaGithub,
  FaFigma,
  FaReact,
} from "react-icons/fa";
import { SiVite, SiTailwindcss, SiVercel } from "react-icons/si";

import { SiKotlin, SiMysql, SiSqlite, SiCanva, SiXampp } from "react-icons/si";

export const skillsGroups = [
  {
    title: "Languages",
    skills: [
      { name: "PHP", icon: FaPhp, color: "#8892be" },
      { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
      { name: "Kotlin", icon: SiKotlin, color: "#7F52FF" },
      { name: "HTML", icon: FaHtml5, color: "#E34F26" },
      { name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
    ],
  },
  {
    title: "Library",
    skills: [{ name: "React", icon: FaReact, color: "#61DBFB" }],
  },
  {
    title: "Frameworks & Tools",
    skills: [
      {
        name: "WordPress (themes & plugins)",
        icon: FaWordpress,
        color: "#21759B",
      },
      { name: "Vite", icon: SiVite, color: "#41D1FF " },
      { name: "TailWind CSS", icon: SiTailwindcss, color: "#38bdf8 " },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "SQLite", icon: SiSqlite, color: "#0D597F" },
    ],
  },
  {
    title: "Version Control & Collaboration",
    skills: [{ name: "Git / GitHub", icon: FaGithub, color: "#181717" }],
  },
  {
    title: "UI/UX & Design",
    skills: [
      { name: "Canva", icon: SiCanva, color: "#07B9CE" },
      { name: "Figma", icon: FaFigma, color: "#F24E1E" },
    ],
  },
  {
    title: "Hosting & Deployment",
    skills: [
      { name: "XAMPP", icon: SiXampp, color: "#FB7A24" },
      { name: "GitHub Pages", icon: FaGithub, color: "#181717" },
      { name: "WordPress Hosting", icon: FaWordpress, color: "#21759B" },
      { name: "Vercel app", icon: SiVercel, color: "#000000" },
    ],
  },
  {
    title: "Strengths",
    skills: [
      { name: "Clean & Maintainable Code" },
      { name: "Problem-Solving" },
      { name: "Accessibility-First Approach" },
      { name: "SEO Awareness" },
      { name: "Continuous Learning" },
    ],
  },
  {
    title: "Soft Skills",
    skills: [
      { name: "Team Collaboration" },
      { name: "Client Communication" },
      { name: "Time Management" },
      { name: "Adaptability" },
      { name: "Project Ownership" },
    ],
  },
];
