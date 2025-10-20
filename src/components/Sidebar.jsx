import { Mail, Github, Linkedin, Facebook } from "lucide-react";
import { profile } from "../data/profile";
import useTypewriter from "../hooks/useTypewriter";
import useAge from "../hooks/useAge";

export default function Sidebar({ onSelectContact }) {
  const typed = useTypewriter(
    ["HTML", "CSS", "JavaScript", "Kotlin", "PHP", "React"],
    {
      typeSpeed: 90,
      deleteSpeed: 50,
      holdTime: 1000,
      gapTime: 250,
    }
  );

  // Auto-updating age (your birthday is Oct 27, 2001)
  const age = useAge("2001-10-27");

  return (
    <aside
      className="
    rounded-2xl 
    border border-gray-200 dark:border-white/10
    bg-white dark:bg-white/5
    shadow-md dark:shadow-none
    p-4 md:p-5
  "
    >
      <div className="aspect-square rounded-xl bg-white/10 grid place-items-center text-sm">
        <img
          src="/images/logo.webp"
          alt="Portrait of Joemarie"
          loading="lazy"
          decoding="async"
          width="640"
          height="640"
          className="h-full w-full rounded-2xl object-cover border border-white/10"
        />
      </div>

      <h2 className="mt-4 text-2xl md:text-3xl font-bold">
        Hi, I’m <span className="text-blue-500">Joemarie</span> 👋
      </h2>

      <p className="mt-2 text-sm md:text-base opacity-90 leading-relaxed">
        Front-end Web Developer focused on clean code, fast performance, and
        great user experience.
      </p>

      {/* Typing line */}
      <p className="mt-4 text-base md:text-lg">
        Web Developer specializing in{" "}
        <span className="font-semibold text-sky-300">{typed}</span>
        <span
          className="ml-0.5 inline-block w-[1ch] border-r-2 border-sky-300 animate-pulse"
          aria-hidden
        />
      </p>

      {/* Links */}
      <div className="mt-4 flex items-center gap-2 flex-wrap">
        <button
          onClick={() => onSelectContact()}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
        >
          <Mail size={16} /> Contact
        </button>
        <a
          href={profile.links.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
        >
          <Github size={16} /> GitHub
        </a>
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
        >
          <Linkedin size={16} /> LinkedIn
        </a>
        <a
          href="https://www.facebook.com/joemarie.amante.ronday/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
        >
          <Facebook size={16} /> Facebook
        </a>
      </div>

      {/* Meta line */}
      <p className="mt-4 text-sm opacity-75">
        {age} years old · Born: October 27, 2001 · Single
      </p>
      <p className="text-sm opacity-75">
        Address: Sitio San Juan, Don Jose Aguirre, Manukan, Zamboanga del Norte
      </p>
    </aside>
  );
}
