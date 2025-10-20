// src/Section/Education.jsx
export default function Education() {
  const schools = [
    {
      name: "Jose Rizal Memorial State University – Katipunan Campus",
      subtitle:
        "Graduated (2024–2025) — Bachelor of Science in Computer Science",
      bullets: [
        "Developed multiple web and mobile projects using PHP, JavaScript, Kotlin, and MySQL.",
        "Completed On-the-Job Training in IT infrastructure and website management.",
        "Actively participated in campus technology events and coding competitions.",
      ],
    },
    {
      name: "Don Jose Aguirre Senior High School",
      subtitle: "Graduated (2019–2020) — Humanities and Social Sciences",
      bullets: [
        "Focused on communication, research, and analytical skills.",
        "Served as a class officer, organizing academic and extracurricular activities.",
        "Engaged in school debates and community outreach programs.",
      ],
    },
    {
      name: "Don Jose Aguirre National High School",
      subtitle: "Graduated (2018–2019)",
      bullets: [
        "Participated in campus organizations and science-related clubs.",
        "Joined inter-school competitions in academic and technical events.",
        "Consistently achieved honors in academics.",
      ],
    },
    {
      name: "Don Jose Aguirre Elementary School",
      subtitle: "Graduated (2013–2014)",
      bullets: [
        "Maintained excellent academic performance throughout primary education.",
        "Actively joined school activities such as sports and arts programs.",
        "Built foundational skills in communication, teamwork, and leadership.",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold">Education</h2>

      {/* grid layout for 2 per row */}
      <div className="grid gap-4 sm:grid-cols-2">
        {schools.map((s) => (
          <EduCard key={s.name} {...s} />
        ))}
      </div>
    </div>
  );
}

function EduCard({ name, subtitle, bullets }) {
  return (
    <article
      className="
        relative
        rounded-2xl
        border border-gray-200 dark:border-white/10
        bg-white dark:bg-white/5
        shadow-sm dark:shadow-none
        overflow-hidden
        transition-transform hover:-translate-y-1
      "
    >
      {/* Accent bar on the left */}
      <span className="absolute left-0 top-0 h-full w-1.5 bg-sky-500/80" />

      <div className="px-4 py-3 md:px-5 md:py-4">
        <h3 className="font-semibold">{name}</h3>
        <p className="mt-1 text-xs opacity-75">{subtitle}</p>

        <ul className="mt-3 list-disc pl-5 space-y-2 leading-relaxed text-sm">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
