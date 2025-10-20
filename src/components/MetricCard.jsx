import { useEffect, useState } from "react";
import useInView from "../hooks/useInView";

export default function MetricCard({ kpi, label }) {
  const { ref, inView } = useInView({ threshold: 0.3 });
  const target = parseInt(kpi, 10);
  const suffix = kpi.replace(/[0-9]/g, "");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return; // pause when not visible
    let timerId;
    let loopId;
    const duration = 2000;
    const stepTime = 20;

    const run = () => {
      let current = 0;
      const totalSteps = Math.max(1, Math.floor(duration / stepTime));
      const increment = target / totalSteps;
      setCount(0);
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

    run();
    loopId = setInterval(run, 8000);

    return () => {
      clearInterval(loopId);
      clearInterval(timerId);
    };
  }, [inView, target]);

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm dark:shadow-none px-5 py-4 text-center"
    >
      <div className="text-2xl font-extrabold">
        {count}
        {suffix}
      </div>
      <div className="text-sm opacity-80">{label}</div>
    </div>
  );
}
