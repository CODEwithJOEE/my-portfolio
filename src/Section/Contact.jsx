// src/Section/Contact.jsx
import { useState } from "react";
import { MdContentCopy } from "react-icons/md";

import ContactChip from "../components/ContactChip";
import { CONTACTS, EMAIL } from "../data/contactData";
import { PERSON_SCHEMA } from "../data/personSchema";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // no-op
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
        {CONTACTS.map((c) => (
          <ContactChip key={c.name} {...c} />
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
          __html: JSON.stringify(PERSON_SCHEMA),
        }}
      />
    </div>
  );
}
