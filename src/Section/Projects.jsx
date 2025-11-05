// src/Section/Projects.jsx
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MetricCard from "../components/MetricCard";

import { projects } from "../data/projects";
import { STATUS_STYLES } from "../data/projectStatusStyles";
import { TECH_STYLES } from "../data/projectTechStyles";

export default function Projects() {
  const [page, setPage] = useState(1);
  const pageSize = 2;

  // Stats
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

      {/* Stats */}
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

      {/* Pagination */}
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
