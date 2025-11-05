// src/components/ContactChip.jsx
import { isExternalLink } from "../data/contactData";

export default function ContactChip({ name, Icon, color, link, download }) {
  const external = !download && isExternalLink(link);

  const className = `
    inline-flex items-center gap-2 px-4 py-2 rounded-xl
    border border-gray-200 dark:border-white/10
    bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10
    shadow-sm dark:shadow-none text-sm font-medium transition
    focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2
    dark:focus:ring-offset-slate-900
  `;

  return (
    <a
      href={link}
      aria-label={name}
      className={className}
      {...(download ? { download: true } : {})}
      {...(external ? { target: "_blank", rel: "noopener noreferrer me" } : {})}
    >
      <span className="text-lg" style={{ color }}>
        <Icon size={18} />
      </span>
      <span>{name}</span>
    </a>
  );
}
