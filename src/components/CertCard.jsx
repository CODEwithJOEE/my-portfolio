// src/components/CertCard.jsx
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function CertCard({ title, issuer, date, img }) {
  const [show, setShow] = useState(false);

  // Close on ESC for accessibility
  useEffect(() => {
    if (!show) return;
    const onKey = (e) => e.key === "Escape" && setShow(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show]);

  return (
    <>
      <article
        onClick={() => setShow(true)}
        className="
          rounded-2xl border border-gray-200 dark:border-white/10
          bg-white dark:bg-white/5 shadow-sm dark:shadow-none
          p-4 text-center cursor-pointer hover:bg-white/10 transition
        "
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setShow(true)}
        aria-label={`Open certificate: ${title}`}
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

      {/* Modal */}
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShow(false)}
            aria-modal="true"
            role="dialog"
            aria-label={`${title} — enlarged`}
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
