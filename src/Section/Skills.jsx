import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Skills() {
  const groups = [
    {
      title: "Languages",
      skills: [
        { name: "PHP", icon: "/icons/php.png" },
        { name: "JavaScript", icon: "/icons/javascript.png" },
        { name: "Kotlin", icon: "/icons/kotlin.png" },
        { name: "HTML", icon: "/icons/html.png" },
        { name: "CSS", icon: "/icons/css.svg" },
      ],
    },
    {
      title: "Frameworks & Tools",
      skills: [
        { name: "Laravel", icon: "/icons/laravel.svg" },
        { name: "WordPress (themes & plugins)", icon: "/icons/wordpress.png" },
      ],
    },
    {
      title: "Databases",
      skills: [
        { name: "MySQL", icon: "/icons/mysql.png" },
        { name: "SQLite", icon: "/icons/sqlite.png" },
        { name: "MySQL Workbench", icon: "/icons/mysql.svg" },
      ],
    },
    {
      title: "Version Control & Collaboration",
      skills: [{ name: "Git / GitHub", icon: "/icons/github.png" }],
    },
    {
      title: "UI/UX & Design",
      skills: [
        { name: "Canva", icon: "/icons/canva.svg" },
        { name: "Figma", icon: "/icons/figma.svg" },
      ],
    },
    {
      title: "Hosting & Deployment",
      skills: [
        { name: "XAMPP", icon: "/icons/xampp.png" },
        { name: "GitHub Pages", icon: "/icons/github.png" },
        { name: "WordPress Hosting", icon: "/icons/wordpress.png" },
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

  // ✅ Show exactly 6 per page (2 rows × 3 columns)
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
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 px-3 py-1 text-sm bg-white/50 dark:bg-white/5"
                  >
                    {s.icon && (
                      <img
                        src={s.icon}
                        alt={s.name}
                        className="w-4 h-4 object-contain"
                        loading="lazy"
                        decoding="async"
                      />
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
