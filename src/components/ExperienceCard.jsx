import { ROLE_BADGE } from "../data/experienceRoleStyles";

export default function ExperienceCard({ org, role, period, bullets }) {
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
