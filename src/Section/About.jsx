import MetricCard from "../components/MetricCard";

export default function About({ onNavigate }) {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl md:text-3xl font-bold">About</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300/90 text-base">
          Turning ideas into high-performance websites and apps that work
          anywhere.
        </p>
      </header>

      {/* What I do */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">What I do</h3>
        <p className="leading-relaxed">
          I build fast, accessible, and maintainable web experiences using{" "}
          <strong>PHP, JavaScript, WordPress</strong>, and a bit of{" "}
          <strong>Kotlin</strong> for mobile. My focus is clean architecture,
          SEO-friendly structure, and consistent UX across devices.
        </p>
      </section>

      {/* How I work */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">How I work</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Clarity first:</strong> define goals, users, and success
            metrics before code.
          </li>
          <li>
            <strong>Performance & accessibility:</strong> ship fast pages with
            semantic HTML, audits, and measurable improvements.
          </li>
          <li>
            <strong>Maintainability:</strong> componentized UI, readable code,
            and clear docs so teams can move quickly after launch.
          </li>
          <li>
            <strong>Collaboration:</strong> tight feedback loops with design and
            stakeholders; ship in small, reliable increments.
          </li>
        </ul>
      </section>

      {/* Metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <MetricCard kpi="3+" label="Years Experience" />
        <MetricCard kpi="10+" label="Projects Shipped" />
        <MetricCard kpi="5+" label="Happy Clients" />
      </section>

      {/* CTA buttons */}
      <div className="flex flex-wrap gap-3 pt-2">
        <button
          onClick={() => onNavigate?.("projects")}
          className="rounded-xl px-4 py-2 bg-sky-600 text-white hover:bg-sky-500 transition shadow-sm"
        >
          See My Work
        </button>
        <button
          onClick={() => onNavigate?.("contact")}
          className="rounded-xl px-4 py-2 border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition shadow-sm"
        >
          Let’s Collaborate
        </button>
      </div>
    </div>
  );
}

/* keep your MetricCard exactly as you have it */
