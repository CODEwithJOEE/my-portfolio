import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaPhp,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaLaravel,
  FaWordpress,
  FaGithub,
  FaFigma,
} from "react-icons/fa";
import { SiKotlin, SiMysql, SiSqlite, SiCanva, SiXampp } from "react-icons/si";

export default function Skills() {
  const groups = [
    {
      title: "Languages",
      skills: [
        { name: "PHP", icon: <FaPhp />, color: "#777BB4" },
        { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E" },
        { name: "Kotlin", icon: <SiKotlin />, color: "#7F52FF" },
        { name: "HTML", icon: <FaHtml5 />, color: "#E34F26" },
        { name: "CSS", icon: <FaCss3Alt />, color: "#1572B6" },
      ],
    },
    {
      title: "Frameworks & Tools",
      skills: [
        { name: "Laravel", icon: <FaLaravel />, color: "#FF2D20" },
        {
          name: "WordPress (themes & plugins)",
          icon: <FaWordpress />,
          color: "#21759B",
        },
      ],
    },
    {
      title: "Databases",
      skills: [
        { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
        { name: "SQLite", icon: <SiSqlite />, color: "#0D597F" },
      ],
    },
    {
      title: "Version Control & Collaboration",
      skills: [{ name: "Git / GitHub", icon: <FaGithub />, color: "#181717" }],
    },
    {
      title: "UI/UX & Design",
      skills: [
        { name: "Canva", icon: <SiCanva />, color: "#00C4CC" },
        { name: "Figma", icon: <FaFigma />, color: "#F24E1E" },
      ],
    },
    {
      title: "Hosting & Deployment",
      skills: [
        { name: "XAMPP", icon: <SiXampp />, color: "#FB7A24" },
        { name: "GitHub Pages", icon: <FaGithub />, color: "#181717" },
        { name: "WordPress Hosting", icon: <FaWordpress />, color: "#21759B" },
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

  // ✅ Show exactly 4 groups per page
  const pageSize = 4;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(groups.length / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const currentGroups = useMemo(() => groups.slice(start, end), [start, end]);

  const go = (p) => setPage(Math.min(Math.max(1, p), totalPages));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold">Skills</h2>

      {/* Grid layout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="grid gap-4 grid-cols-1 sm:grid-cols-2"
        >
          {currentGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-4 shadow-sm dark:shadow-none"
            >
              <h3 className="text-lg font-semibold text-sky-400 mb-3">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((s) => (
                  <span
                    key={s.name}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 px-3 py-1 text-sm bg-white/50 dark:bg-white/5 transition-all hover:scale-105 hover:shadow-sm"
                  >
                    {s.icon && (
                      <span
                        className="text-lg"
                        style={{ color: s.color || "#6B7280" }}
                      >
                        {s.icon}
                      </span>
                    )}
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm opacity-80">
          Showing <strong>{start + 1}</strong>–
          <strong>{Math.min(end, groups.length)}</strong> of{" "}
          <strong>{groups.length}</strong> groups
        </p>

        <nav className="inline-flex items-center gap-2">
          <button
            onClick={() => go(page - 1)}
            disabled={page === 1}
            className="px-3 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => go(n)}
              className={`px-3 py-2 rounded-xl border text-sm ${
                n === page
                  ? "bg-sky-600 text-white border-sky-600"
                  : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10"
              }`}
              aria-current={n === page ? "page" : undefined}
            >
              {n}
            </button>
          ))}

          <button
            onClick={() => go(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 disabled:opacity-50"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}
