export default function Layout({ left, right, footer }) {
  return (
    <>
      <main className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-1 md:grid-cols-[340px,1fr] gap-6">
        {/* Left column without extra padding */}
        <Card className="p-0">{left}</Card>

        {/* Right column standard spacing */}
        <Card className="min-h-[380px]">{right}</Card>
      </main>

      <footer className="mx-auto max-w-6xl px-4 pb-10 opacity-70 text-xs">
        {footer ?? (
          <>© {new Date().getFullYear()} Joe Portfolio. All rights reserved.</>
        )}
      </footer>
    </>
  );
}

/** Reusable styled section wrapper */
function Card({ children, className = "" }) {
  return (
    <section
      className={[
        "rounded-2xl",
        "border border-gray-200 dark:border-white/10",
        "bg-white dark:bg-white/5",
        "shadow-sm dark:shadow-none",
        "p-5 md:p-8",
        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}
