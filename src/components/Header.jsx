import { useEffect, useMemo, useRef, useState, useId } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";

/**
 * Header component
 *
 * Organized and accessible version with inline comments for clarity.
 */
export default function Header({
  brand = "JOE Portfolio", // Brand name displayed on header
  pages = [], // Array of navigation pages [{ id, label }]
  active, // Currently active page ID
  onSelect, // Function to call when user selects a page
  dark, // Boolean for dark/light theme
  onToggleTheme, // Function to toggle theme
}) {
  const [open, setOpen] = useState(false); // Mobile menu open state
  const mdUp = useMediaQuery("(min-width: 768px)"); // Track if viewport >= md breakpoint
  const panelRef = useRef(null); // Ref for detecting clicks outside mobile menu
  const navId = useId(); // Unique ID for aria-controls linking

  // Close menu when switching from mobile to desktop view
  useEffect(() => {
    if (mdUp && open) setOpen(false);
  }, [mdUp, open]);

  // Close mobile menu when pressing Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close mobile menu when clicking outside of it
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    const body = document.body;
    if (open) {
      body.dataset.scrollLock = "true";
      body.style.overflow = "hidden";
    } else if (body.dataset.scrollLock) {
      delete body.dataset.scrollLock;
      body.style.overflow = "";
    }
    return () => {
      if (document.body.dataset.scrollLock) {
        delete document.body.dataset.scrollLock;
        document.body.style.overflow = "";
      }
    };
  }, [open]);

  // Split brand text into first and remaining words for styling
  const { first: brandFirst, rest: brandRest } = useMemo(
    () => splitBrand(brand),
    [brand]
  );

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-slate-900/60 bg-white/90 dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Brand section (click to go to About) */}
          <Brand
            first={brandFirst}
            rest={brandRest}
            onClick={() => {
              onSelect?.("about");
              setOpen(false);
            }}
          />

          {/* Desktop navigation - only visible from md breakpoint and above */}
          <DesktopNav pages={pages} active={active} onSelect={onSelect} />

          {/* Right-side actions: theme toggle + mobile toggle */}
          <div className="flex items-center gap-2">
            <ThemeToggle dark={dark} onToggle={onToggleTheme} />
            <MobileToggle
              open={open}
              onToggle={() => setOpen((o) => !o)}
              controlsId={`mobile-nav-${navId}`}
            />
          </div>
        </div>

        {/* Mobile navigation menu */}
        <MobileNav
          id={`mobile-nav-${navId}`}
          ref={panelRef}
          open={open}
          pages={pages}
          active={active}
          onSelect={(id) => {
            onSelect?.(id);
            setOpen(false);
          }}
        />
      </div>
    </header>
  );
}

/** Utility: Split brand name into two parts for styling */
function splitBrand(str) {
  const parts = String(str).trim().split(/\s+/);
  return { first: parts[0] ?? "", rest: parts.slice(1).join(" ") };
}

/** Utility: Join class names conditionally */
function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** Brand button component */
function Brand({ first, rest, onClick }) {
  return (
    <button
      type="button"
      className="text-lg font-semibold tracking-wide hover:opacity-90 transition"
      onClick={onClick}
      aria-label="Go to About"
    >
      {first} {rest && <span className="font-extrabold">{rest}</span>}
    </button>
  );
}

/** Desktop navigation (visible only on md+) */
function DesktopNav({ pages, active, onSelect }) {
  return (
    <nav
      className="hidden md:flex items-center gap-6 text-sm"
      aria-label="Primary"
    >
      {pages.map((p) => (
        <button
          type="button"
          key={p.id}
          onClick={() => onSelect?.(p.id)}
          aria-current={active === p.id ? "page" : undefined}
          className={cx(
            "transition hover:opacity-90",
            active === p.id
              ? "font-semibold underline underline-offset-4"
              : "opacity-80"
          )}
        >
          {p.label}
        </button>
      ))}
    </nav>
  );
}

/** Theme toggle button (light/dark) */
function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

/** Mobile menu toggle (hamburger / close icon) */
function MobileToggle({ open, onToggle, controlsId }) {
  return (
    <button
      type="button"
      className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition"
      onClick={onToggle}
      aria-label="Toggle menu"
      aria-expanded={open}
      aria-controls={controlsId}
    >
      {open ? <X size={18} /> : <Menu size={18} />}
    </button>
  );
}

/** Mobile navigation panel */
const MobileNav = Object.assign(
  // ForwardRef allows parent to detect clicks outside of menu
  (props, ref) => {
    const { open, pages, active, onSelect, id, ...rest } = props;
    return (
      <div
        id={id}
        ref={ref}
        {...rest}
        className={cx(
          "md:hidden overflow-hidden transition-[max-height,opacity] duration-200 motion-reduce:transition-none",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
        aria-hidden={!open}
      >
        <div className="mt-2 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/70 shadow-sm">
          <ul className="py-2" role="menu" aria-label="Mobile">
            {pages.map((p) => (
              <li key={p.id} role="none">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => onSelect?.(p.id)}
                  aria-current={active === p.id ? "page" : undefined}
                  className={cx(
                    "w-full text-left px-4 py-3 text-sm transition hover:bg-black/5 dark:hover:bg-white/5",
                    active === p.id ? "font-semibold" : "opacity-90"
                  )}
                >
                  {p.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
  { displayName: "MobileNav" }
);

/** Custom hook: respond to viewport media queries */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    // Guard for SSR and older browsers
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    )
      return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    )
      return;
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    // Use correct listener depending on browser
    mql.addEventListener?.("change", handler) || mql.addListener?.(handler);
    setMatches(mql.matches);
    return () => {
      mql.removeEventListener?.("change", handler) ||
        mql.removeListener?.(handler);
    };
  }, [query]);

  return matches; // true or false depending on screen size
}
