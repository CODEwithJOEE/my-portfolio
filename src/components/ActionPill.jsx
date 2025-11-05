export default function ActionPill({
  as = "a",
  href,
  onClick,
  Icon,
  children,
  "aria-label": ariaLabel,
}) {
  const base =
    "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm " +
    "hover:bg-black/5 dark:hover:bg-white/5 transition " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50";

  if (as === "button") {
    return (
      <button
        onClick={onClick}
        className={base}
        aria-label={ariaLabel}
        type="button"
      >
        {Icon ? <Icon size={16} /> : null}
        {children}
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={base}
      aria-label={ariaLabel}
    >
      {Icon ? <Icon size={16} /> : null}
      {children}
    </a>
  );
}
