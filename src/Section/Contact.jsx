import { useState } from "react";
import { MdEmail, MdContentCopy } from "react-icons/md";
import {
  FaPhone,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaDownload,
} from "react-icons/fa";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  // Use icon components + brand colors
  const contacts = [
    {
      name: "Email",
      icon: <MdEmail size={20} />,
      color: "#EA4335", // Gmail red
      link: "mailto:joemarie27r@gmail.com?subject=Project%20Inquiry%20from%20Portfolio",
    },
    {
      name: "Phone",
      icon: <FaPhone size={18} />,
      color: "#16a34a", // green-ish
      link: "tel:+639073195155",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={18} />,
      color: "#25D366",
      link: "https://wa.me/639073195155",
    },
    {
      name: "Facebook",
      icon: <FaFacebook size={18} />,
      color: "#1877F2",
      link: "https://www.facebook.com/joemarie.amante.ronday/",
    },
    {
      name: "Instagram",
      icon: <FaInstagram size={18} />,
      color: "#E4405F",
      link: "https://www.instagram.com/joemari_e69/?hl=de",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin size={18} />,
      color: "#0A66C2",
      link: "https://ph.linkedin.com/in/joemarie-ronday-908a9a360",
    },
    {
      name: "Download vCard",
      icon: <FaDownload size={18} />,
      color: "#0284C7",
      link: "/files/joemarie-ronday.vcf", // place a .vcf in /public/files
      download: true,
    },
  ];

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("joemarie27r@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silently fail
    }
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
        {contacts.map((c) => {
          const isDownload = Boolean(c.download);
          return (
            <a
              key={c.name}
              href={c.link}
              // only open new tab for external links
              target={isDownload ? undefined : "_blank"}
              rel={isDownload ? undefined : "noopener noreferrer me"}
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
              <span className="text-lg" style={{ color: c.color }}>
                {c.icon}
              </span>
              <span>{c.name}</span>
            </a>
          );
        })}

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
          <MdContentCopy size={18} className="opacity-80" />
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
