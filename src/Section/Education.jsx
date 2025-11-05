import EduCard from "../components/EduCard";
import { schools } from "../data/educationSchools";

export default function Education() {
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
