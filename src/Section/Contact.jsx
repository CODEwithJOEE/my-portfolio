// src/Section/Contact.jsx
export default function Contact() {
  const contacts = [
    {
      name: "Email",
      icon: "/icons/gmail.webp",
      link: "mailto:joemarie27r@gmail.com",
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
      link: "ph.linkedin.com/in/joemarie-ronday-908a9a360",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold">Contact</h2>
      <p className="opacity-80 text-sm md:text-base">
        Reach me on any platform below.
      </p>

      <div className="flex flex-wrap gap-3">
        {contacts.map((c) => (
          <a
            key={c.name}
            href={c.link}
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex items-center gap-2 px-4 py-2 rounded-xl
              border border-gray-200 dark:border-white/10
              bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10
              shadow-sm dark:shadow-none text-sm font-medium transition
            "
          >
            <img
              src={c.icon}
              alt={c.name}
              className="w-5 h-5 object-contain"
              loading="lazy"
            />
            {c.name}
          </a>
        ))}
      </div>
    </div>
  );
}
