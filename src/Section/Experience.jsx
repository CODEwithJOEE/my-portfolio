// src/Section/Experience.jsx
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const summary = [
  "Build and maintain responsive websites and apps using PHP, JavaScript, HTML, CSS, and MySQL.",
  "Enhance site performance, accessibility, and SEO rankings.",
  "Develop and maintain client and corporate websites, including e-commerce platforms.",
];

const items = [
  {
    org: "Jose Rizal Memorial State University – Katipunan Campus",
    role: "OJT Trainee",
    period: "200 Hours — 3 Months",
    bullets: [
      "Installed Wi-Fi routers and network cables across campus buildings.",
      "Performed maintenance on computer laboratory systems, including cleaning and hardware checks.",
      "Upgraded operating systems from Windows 10 to Windows 11 for multiple workstations.",
    ],
  },
  {
    org: "OBI Services",
    role: "Web Developer",
    period: "4 months — Present",
    bullets: [
      "Maintained OBI Services corporate website, implementing new features and improving SEO.",
      "Integrated WordPress custom themes with PHP and JavaScript for advanced functionality.",
      "Optimized website load speed and mobile responsiveness for better user experience.",
    ],
  },
  {
    org: "MLhuillier Financial Services",
    role: "Staff",
    period: "8 months",
    bullets: [
      "Supported branch operations, documentation, and customer service tasks.",
      "Processed financial transactions including remittances, bills payments, and pawnshop services.",
      "Managed and verified customer records for accuracy and compliance.",
      "Assisted in resolving customer concerns quickly and professionally.",
      "Maintained confidentiality and security of sensitive customer information.",
    ],
  },
];

const ROLE_BADGE = {
  "OJT Trainee":
    "bg-slate-600 text-white shadow-sm ring-1 ring-black/10 " +
    "dark:bg-slate-500 dark:text-white dark:ring-white/15",

  "Web Developer":
    "bg-sky-600 text-white shadow-sm ring-1 ring-black/10 " +
    "dark:bg-sky-500 dark:text-white dark:ring-white/15",

  Staff:
    "bg-emerald-600 text-white shadow-sm ring-1 ring-black/10 " +
    "dark:bg-emerald-500 dark:text-white dark:ring-white/15",
};

export default function Experience() {
  const [page, setPage] = useState(1); // one card per page
  const totalPages = items.length;

  const current = useMemo(() => items[page - 1], [page]);

  const go = (p) => setPage(Math.min(Math.max(1, p), totalPages));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold">Experience</h2>

      {/* summary bullets */}
      <ul className="list-disc pl-6 space-y-2">
        {summary.map((s) => (
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

function ExperienceCard({ org, role, period, bullets }) {
  return (
    <article
      className="
        rounded-2xl
        border border-gray-200 dark:border-white/10
        bg-white dark:bg-white/5
        shadow-sm dark:shadow-none
        overflow-hidden
      "
    >
      {/* header */}
      <div className="flex items-center justify-between px-4 pt-4">
        <h3 className="font-semibold">{org}</h3>
        <span
          className={`text-xs font-semibold rounded-full px-3 py-1 ${
            ROLE_BADGE[role] ||
            "bg-slate-500/10 text-slate-200 border border-white/10"
          }`}
        >
          {role}
        </span>
      </div>

      <div className="px-4 pb-4">
        <div className="mt-1 text-xs opacity-80 border-b border-gray-200 dark:border-white/10 pb-3">
          {period}
        </div>
        <ul className="mt-3 list-disc pl-5 space-y-2 leading-relaxed">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
