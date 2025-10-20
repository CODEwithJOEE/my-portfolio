import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";

export default function Header({
  brand = "Joe Portfolio",
  pages,
  active,
  onSelect,
  dark,
  onToggleTheme,
}) {
  const [open, setOpen] = useState(false);

  // Close the mobile menu when viewport becomes >= md
  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const brandFirst = brand.split(" ")[0];
  const brandRest = brand.split(" ").slice(1).join(" ");

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/60 text-slate-100 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Brand (click goes to About) */}
          <button
            className="text-lg font-semibold tracking-wide hover:opacity-90 transition"
            onClick={() => {
              onSelect("about");
              setOpen(false);
            }}
            aria-label="Go to About"
          >
            {brandFirst} <span className="font-extrabold">{brandRest}</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {pages.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelect(p.id)}
                className={`transition hover:opacity-90 ${
                  active === p.id
                    ? "font-semibold underline underline-offset-4"
                    : "opacity-80"
                }`}
              >
                {p.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={onToggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 hover:bg-white/5 transition"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 hover:bg-white/5 transition"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile nav panel */}
        <div
          id="mobile-nav"
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-200 ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-2 rounded-2xl border border-white/10 bg-slate-900/70">
            <ul className="py-2">
              {pages.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => {
                      onSelect(p.id);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm transition hover:bg-white/5 ${
                      active === p.id ? "font-semibold" : "opacity-90"
                    }`}
                  >
                    {p.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
