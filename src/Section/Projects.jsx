// src/Section/Projects.jsx
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MetricCard from "../components/MetricCard";

const STATUS_STYLES = {
  Completed: "bg-emerald-600/15 text-emerald-300 border border-emerald-400/20",
  Ongoing: "bg-amber-500/15 text-amber-300 border border-amber-400/20",
  Live: "bg-sky-500/15 text-sky-300 border border-sky-400/20",
};

const TECH_STYLES = {
  HTML: "bg-orange-500/15 text-orange-300 border-orange-400/20",
  CSS: "bg-blue-500/15 text-blue-300 border-blue-400/20",
  JavaScript: "bg-yellow-500/15 text-yellow-200 border-yellow-400/20",
  MySQL: "bg-cyan-500/15 text-cyan-300 border-cyan-400/20",
  Kotlin: "bg-indigo-500/15 text-indigo-300 border-indigo-400/20",
  SQLite: "bg-teal-500/15 text-teal-300 border-teal-400/20",
  WordPress: "bg-sky-500/15 text-sky-300 border-sky-400/20",
  PHP: "bg-violet-500/15 text-violet-300 border-violet-400/20",
};

const projects = [
  {
    title: "Coffee Shop Website",
    status: "Completed",
    img: "/projects/Coffee-Shop.jpg",
    desc: "A business site for a coffee shop with menu pages and basic ordering forms. Built with PHP, JavaScript, HTML & CSS. Data stored in MySQL.",
    techs: ["PHP", "JavaScript", "MySQL"],
    live: "https://example.com/coffee-shop",
  },
  {
    title: "Milk Tea Shop Website",
    status: "Completed",
    img: "/projects/Boba-Bliss.avif",
    desc: "Brand website for a milk tea shop including product catalog and contact form. Built with PHP, JavaScript, HTML & CSS with a MySQL database.",
    techs: ["PHP", "JavaScript", "MySQL"],
    live: "https://example.com/milktea",
  },
  {
    title: "Disaster Master 2.0 (Kotlin)",
    status: "Completed",
    img: "/projects/Disaster-Master.png",
    desc: "A Kotlin app showing disasters… Tagalog/English/Bisaya support and before/after videos.",
    techs: ["Kotlin", "SQLite"],
    live: "https://example.com/disaster-master",
  },
  {
    title: "Client Portfolio Website Project",
    status: "Completed",
    img: "/projects/myprofilewebsite.png",
    desc: "A portfolio website showcasing projects and skills. Built with HTML, CSS and JavaScript.",
    techs: ["HTML", "CSS", "JavaScript"],
    live: "https://codewithjoee.github.io/MyWebsiteProfile/",
  },
  {
    title: "Sample Portfolio Website Project",
    status: "Live",
    img: "/projects/profilewebsite.jpg",
    desc: "A sample profile website showcasing projects, about, education, experience, and skills.",
    techs: ["HTML", "CSS", "JavaScript"],
    live: "https://codewithjoee.github.io/WebsiteProfile2.0/",
  },
  {
    title: "OBI Services Corporate Website",
    status: "Ongoing",
    img: "/projects/OBI-Homepage.png",
    desc: "Corporate site work including SEO optimization, UI improvements, content updates, and performance enhancements.",
    techs: ["WordPress", "PHP", "JavaScript", "HTML", "CSS"],
    live: "https://obi.services/",
  },
];

export default function Projects() {
  const [page, setPage] = useState(1);
  const pageSize = 2;

  // ✅ project stats for MetricCards
  const totals = useMemo(() => {
    const total = projects.length;
    const completed = projects.filter((p) => p.status === "Completed").length;
    const live = projects.filter((p) => p.status === "Live").length;
    const ongoing = projects.filter((p) => p.status === "Ongoing").length;
    return { total, completed, live, ongoing };
  }, []);

  const totalPages = Math.ceil(projects.length / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const pageItems = useMemo(() => projects.slice(start, end), [start, end]);

  const go = (p) => setPage(Math.min(Math.max(1, p), totalPages));

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold">Projects</h2>

      {/* ✅ Stats row (animated MetricCards) */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard kpi={`${totals.total}`} label="Total" />
        <MetricCard kpi={`${totals.completed}`} label="Completed" />
        <MetricCard kpi={`${totals.live}`} label="Live" />
        <MetricCard kpi={`${totals.ongoing}`} label="Ongoing" />
      </div>

      {/* Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="mt-4 grid gap-6 sm:grid-cols-2"
        >
          {pageItems.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination (unchanged) */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm opacity-80">
          Showing <strong>{start + 1}</strong>–
          <strong>{Math.min(end, projects.length)}</strong> of{" "}
          <strong>{projects.length}</strong>
        </p>

        <nav className="inline-flex items-center gap-2">
          <button
            onClick={() => go(page - 1)}
            disabled={page === 1}
            className="px-3 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 disabled:opacity-50"
          >
            Prev
          </button>

          {/* numbered buttons */}
          <div className="inline-flex items-center gap-1">
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
          </div>

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

function ProjectCard({ title, status, img, desc, techs, live }) {
  return (
    <article
      className="
        rounded-2xl p-3
        border border-gray-200 dark:border-white/10
        bg-white dark:bg-white/5
        shadow-sm dark:shadow-none
        flex flex-col
      "
    >
      {/* Image + status */}
      <div className="relative">
        <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white/5">
          <img
            src={img}
            alt={title}
            className="w-full h-44 object-cover"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.src = "/projects/placeholder.png";
            }}
          />
        </div>
        <span
          className={`absolute top-2 right-2 rounded-full px-2.5 py-1 text-xs font-semibold ${
            STATUS_STYLES[status] ||
            "bg-slate-500/15 text-slate-300 border border-slate-400/20"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 px-1 pt-3 pb-2 flex flex-col">
        <h3 className="font-semibold leading-snug">{title}</h3>
        <p className="mt-2 text-sm opacity-90 leading-relaxed">{desc}</p>

        {/* Tech chips */}
        <div className="mt-3 flex flex-wrap gap-2">
          {techs.map((t) => (
            <span
              key={t}
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs border ${
                TECH_STYLES[t] ||
                "bg-slate-500/15 text-slate-300 border-slate-400/20"
              }`}
              title={t}
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-4">
          <a
            href={live}
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex items-center justify-center w-full rounded-xl
              bg-sky-600 hover:bg-sky-500 text-white
              px-4 py-2 text-sm font-medium transition
              shadow-sm
            "
          >
            View Live
          </a>
        </div>
      </div>
    </article>
  );
}
