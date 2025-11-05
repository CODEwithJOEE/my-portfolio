// src/Section/Certificates.jsx
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CERTS } from "../data/certificates";
import CertCard from "../components/CertCard";

export default function Certificates() {
  const pageSize = 2;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(CERTS.length / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  // CERTS is a static import; depend only on pagination indices
  const pageItems = useMemo(() => CERTS.slice(start, end), [start, end]);

  const go = (p) => setPage(Math.min(Math.max(1, p), totalPages));

  return (
    <div className="space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        Certificates
      </h2>
      <p className="text-center opacity-80">Proof of skills and achievements</p>

      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="grid gap-4 sm:grid-cols-2"
          aria-label={`Certificates page ${page} of ${totalPages}`}
        >
          {pageItems.map((c) => (
            <CertCard key={c.title + c.date} {...c} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm opacity-80">
          Showing <strong>{start + 1}</strong>–
          <strong>{Math.min(end, CERTS.length)}</strong> of{" "}
          <strong>{CERTS.length}</strong>
        </p>

        <nav
          className="inline-flex items-center gap-2"
          aria-label="Certificates pagination"
        >
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
