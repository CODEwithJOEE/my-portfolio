import { useEffect, useState } from "react";
export default function About({ onNavigate }) {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl md:text-3xl font-bold">About</h2>
        <p className="mt-2 text-slate-300 dark:text-slate-300/90 text-base">
          Turning ideas into high-performance websites & apps that work
          anywhere.
        </p>
      </header>

      <section className="space-y-4">
        <p className="leading-relaxed">
          I’m <span className="font-semibold">Joemarie Amante Ronday</span>, a
          web developer passionate about building fast, clean, and user-friendly
          web apps. I enjoy transforming ideas into products, whether it’s a
          store website or a Kotlin mobile app connected to a MySQL database.
        </p>

        <ul className="list-disc pl-5 space-y-2">
          <li>
            Built and launched <strong>10+ websites</strong> for small
            businesses and startups.
          </li>
          <li>
            Improved website load speed by up to <strong>60%</strong> through
            optimization.
          </li>
          <li>
            Hands-on experience with{" "}
            <strong>PHP, JavaScript, Kotlin & MySQL</strong>.
          </li>
        </ul>

        <p className="leading-relaxed">
          My approach is simple: <em>clean, maintainable code</em>, a focus on
          <em> accessibility and performance</em>, and clear communication. I
          iterate quickly, ship reliably, and stay current with tools and best
          practices so the solutions I build keep working long after launch.
        </p>
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

      <p className="text-sm opacity-80">
        Outside of coding, I explore UI/UX trends, develop mobile apps, and
        enjoy a strong cup of coffee while brainstorming my next project.
      </p>
    </div>
  );
}

function MetricCard({ kpi, label }) {
  const target = parseInt(kpi, 10); // e.g. "10+" -> 10
  const suffix = kpi.replace(/[0-9]/g, ""); // "+" (or empty)
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timerId; // the fast interval that increments the number
    let loopId; // the 8s restart interval

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const duration = prefersReduced ? 0 : 2000; // 2s animate; 0 if reduced-motion
    const stepTime = 20;

    const run = () => {
      if (duration === 0) {
        setCount(target);
        return;
      }
      let current = 0;
      setCount(0);

      const totalSteps = Math.max(1, Math.floor(duration / stepTime));
      const increment = target / totalSteps;

      clearInterval(timerId);
      timerId = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timerId);
        }
        setCount(Math.floor(current));
      }, stepTime);
    };

    run(); // start immediately

    // restart every 8s
    loopId = setInterval(run, 8000);

    return () => {
      clearInterval(loopId);
      clearInterval(timerId);
    };
  }, [target]);

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm dark:shadow-none px-5 py-4 text-center">
      <div className="text-2xl font-extrabold">
        {count}
        {suffix}
      </div>
      <div className="text-sm opacity-80">{label}</div>
    </div>
  );
}
