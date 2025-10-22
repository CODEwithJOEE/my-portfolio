import { Mail, Github, Linkedin, Facebook } from "lucide-react";
import { profile } from "../data/profile";
import useTypewriter from "../hooks/useTypewriter";
import useAge from "../hooks/useAge";

const TECH_COLORS = {
  HTML: "text-orange-500 dark:text-orange-300",
  CSS: "text-blue-500 dark:text-blue-300",
  JavaScript: "text-yellow-500 dark:text-yellow-200",
  Kotlin: "text-indigo-500 dark:text-indigo-300",
  PHP: "text-violet-500 dark:text-violet-300",
  React: "text-cyan-500 dark:text-cyan-300",
};
const TECH_CURSOR = {
  HTML: "border-orange-500 dark:border-orange-300",
  CSS: "border-blue-500 dark:border-blue-300",
  JavaScript: "border-yellow-500 dark:border-yellow-200",
  Kotlin: "border-indigo-500 dark:border-indigo-300",
  PHP: "border-violet-500 dark:border-violet-300",
  React: "border-cyan-500 dark:border-cyan-300",
};

export default function Sidebar({ onSelectContact }) {
  const typed = useTypewriter(profile.techRotation, {
    typeSpeed: 90,
    deleteSpeed: 50,
    holdTime: 1000,
    gapTime: 250,
  });
  const age = useAge(profile.birthDateISO);

  return (
    <aside className="rounded-2xl bg-transparent">
      <div className="space-y-4">
        <div className="aspect-square overflow-hidden rounded-full ring-2 ring-white/10 flex items-center justify-center">
          <img
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            loading="lazy"
            decoding="async"
            width="640"
            height="640"
            className="h-full w-full object-cover object-top rounded-full scale-105"
          />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold">
          {profile.headlineGreeting}{" "}
          <span className="text-blue-500">{profile.name}</span> 👋
        </h2>

        <p className="text-sm md:text-base opacity-90 leading-relaxed">
          {profile.summary}
        </p>

        <p className="text-base md:text-lg">
          {profile.specialtiesLabel}{" "}
          <span
            className={`font-semibold transition-colors duration-300 dark:drop-shadow-[0_0_4px_rgba(255,255,255,0.35)] ${
              TECH_COLORS[typed] || "text-sky-500 dark:text-sky-300"
            }`}
          >
            {typed}
          </span>
          <span
            className={`ml-0.5 inline-block w-[1ch] border-r-2 animate-pulse ${
              TECH_CURSOR[typed] || "border-sky-500 dark:border-sky-300"
            }`}
            aria-hidden
          />
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onSelectContact}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
          >
            <Mail size={16} /> {profile.ctas.contact}
          </button>

          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
          >
            <Github size={16} /> {profile.ctas.github}
          </a>

          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
          >
            <Linkedin size={16} /> {profile.ctas.linkedin}
          </a>

          <a
            href={profile.links.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
          >
            <Facebook size={16} /> {profile.ctas.facebook}
          </a>
        </div>

        <div className="space-y-1">
          <p className="text-sm opacity-75">
            {age} years old · Born: October 27, 2001 · {profile.statusLine}
          </p>
          <p className="text-sm opacity-75">{profile.address}</p>
        </div>
      </div>
    </aside>
  );
}
