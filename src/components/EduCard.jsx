export default function EduCard({ name, subtitle, bullets }) {
  return (
    <article
      className="
        relative
        rounded-2xl
        border border-gray-200 dark:border-white/10
        bg-white dark:bg-white/5
        shadow-sm dark:shadow-none
        overflow-hidden
        transition-transform hover:-translate-y-1
      "
    >
      {/* Accent bar on the left */}
      <span className="absolute left-0 top-0 h-full w-1.5 bg-sky-500/80" />

      <div className="px-4 py-3 md:px-5 md:py-4">
        <h3 className="font-semibold">{name}</h3>
        <p className="mt-1 text-xs opacity-75">{subtitle}</p>

        <ul className="mt-3 list-disc pl-5 space-y-2 leading-relaxed text-sm">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
