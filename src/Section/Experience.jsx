import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ExperienceCard from "../components/ExperienceCard";
import { experienceSummary } from "../data/experienceSummary";
import { experienceItems } from "../data/experienceItems";

export default function Experience() {
  const [page, setPage] = useState(1); // one card per page
  const totalPages = experienceItems.length;

  // items is a static import; only depend on page to keep ESLint happy
  const current = useMemo(() => experienceItems[page - 1], [page]);

  const go = (p) => setPage(Math.min(Math.max(1, p), totalPages));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold">Experience</h2>

      {/* summary bullets */}
      <ul className="list-disc pl-6 space-y-2">
        {experienceSummary.map((s) => (
          <li key={s} className="leading-relaxed">
            {s}
          </li>
        ))}
      </ul>

      {/* single card with transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <ExperienceCard {...current} />
        </motion.div>
      </AnimatePresence>

      {/* pagination */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm opacity-80">
          Showing <strong>{page}</strong> of <strong>{totalPages}</strong>
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
