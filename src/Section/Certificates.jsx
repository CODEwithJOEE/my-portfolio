// src/Section/Certificates.jsx
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ---- data ----
const CERTS = [
  {
    title: "Certificate of Excellence",
    issuer: "OBI Services",
    date: "July 2025",
    img: "/certificates/july2025.webp",
  },
  {
    title: "START UP 101 WORKSHOP",
    issuer: "DICT",
    date: "December 01, 2022",
    img: "/certificates/startup101.jpg",
  },
  {
    title: "To be Input",
    issuer: "soon",
    date: "2024",
    img: "/certificates/advanced-js.jpg",
  },
  {
    title: "To be Input",
    issuer: "soon",
    date: "2023",
    img: "/certificates/kotlin-basics.jpg",
  },
];

// ---- main component ----
function Certificates() {
  const pageSize = 2;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(CERTS.length / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

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

// ---- card with click-to-zoom modal ----
function CertCard({ title, issuer, date, img }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <article
        onClick={() => setShow(true)}
        className="
          rounded-2xl border border-gray-200 dark:border-white/10
          bg-white dark:bg-white/5 shadow-sm dark:shadow-none
          p-4 text-center cursor-pointer hover:bg-white/10 transition
        "
      >
        <div className="mx-auto max-w-xs rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white/5">
          <img
            src={img}
            alt={title}
            className="w-full object-cover"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.src = "/certificates/placeholder.jpg";
            }}
          />
        </div>

        <h3 className="mt-3 font-semibold">{title}</h3>
        <p className="text-sm opacity-80">
          Issued by {issuer} — {date}
        </p>
      </article>

      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShow(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 p-4 rounded-2xl max-w-3xl w-[90%] text-center shadow-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <img
                src={img}
                alt={title}
                className="w-full rounded-xl mb-3"
                loading="lazy"
              />
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm opacity-80">
                Issued by {issuer} — {date}
              </p>
              <button
                onClick={() => setShow(false)}
                className="mt-4 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Certificates;
