import { useState } from "react";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const contacts = [
    {
      name: "Email",
      icon: "/icons/gmail.webp",
      // Prefill subject to look professional
      link: "mailto:joemarie27r@gmail.com?subject=Project%20Inquiry%20from%20Portfolio",
    },
    {
      name: "Phone",
      icon: "/icons/phone-call.png",
      link: "tel:+639073195155",
    },
    {
      name: "WhatsApp",
      icon: "/icons/WhatsApp.webp",
      link: "https://wa.me/639073195155",
    },

    {
      name: "Facebook",
      icon: "/icons/facebook.webp",
      link: "https://www.facebook.com/joemarie.amante.ronday/",
    },
    {
      name: "Instagram",
      icon: "/icons/instagram.webp",
      link: "https://www.instagram.com/joemari_e69/?hl=de",
    },
    {
      name: "LinkedIn",
      icon: "/icons/linkedin.png",
      link: "https://ph.linkedin.com/in/joemarie-ronday-908a9a360",
    },
    {
      name: "Download vCard",
      icon: "/icons/download.png",
      link: "/files/joemarie-ronday.vcf", // ← place a .vcf in /public/files
      download: true,
    },
  ];

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("joemarie27r@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl md:text-3xl font-bold">Contact</h2>
        <p className="opacity-80 text-sm md:text-base">
          Reach me on any platform below.{" "}
          <span className="opacity-70">I typically reply within 24 hours.</span>
        </p>
      </header>

      {/* Contact chips */}
      <div className="flex flex-wrap gap-3">
        {contacts.map((c) => (
          <a
            key={c.name}
            href={c.link}
            target="_blank"
            rel="noopener noreferrer me"
            download={c.download || undefined}
            aria-label={c.name}
            className="
              inline-flex items-center gap-2 px-4 py-2 rounded-xl
              border border-gray-200 dark:border-white/10
              bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10
              shadow-sm dark:shadow-none text-sm font-medium transition
              focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2
              dark:focus:ring-offset-slate-900
            "
          >
            <img
              src={c.icon}
              alt=""
              className="w-5 h-5 object-contain"
              loading="lazy"
            />
            <span>{c.name}</span>
          </a>
        ))}

        {/* Copy email button */}
        <button
          type="button"
          onClick={copyEmail}
          className="
            inline-flex items-center gap-2 px-4 py-2 rounded-xl
            border border-gray-200 dark:border-white/10
            bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10
            shadow-sm dark:shadow-none text-sm font-medium transition
            focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2
            dark:focus:ring-offset-slate-900
          "
          aria-live="polite"
        >
          <img src="/icons/copy.png" alt="" className="w-5 h-5" />
          {copied ? "Email copied!" : "Copy Email"}
        </button>

        <span aria-live="polite" className="sr-only">
          {copied ? "Email copied to clipboard" : ""}
        </span>
      </div>

      {/* JSON-LD for Person */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Joemarie Ronday",
            jobTitle: "Front-end Web Developer",
            url: "https://joe-portfolio-website.vercel.app/",
            email: "mailto:joemarie27r@gmail.com",
            telephone: "+639073195155",
            sameAs: [
              "https://www.facebook.com/joemarie.amante.ronday/",
              "https://ph.linkedin.com/in/joemarie-ronday-908a9a360",
              "https://www.instagram.com/joemari_e69/",
            ],
          }),
        }}
      />
    </div>
  );
}
