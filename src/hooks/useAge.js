import { useEffect, useState } from "react";

/** Calculate age for a given birthdate string 'YYYY-MM-DD' */
export function calcAge(birthISO) {
  const today = new Date();
  const [y, m, d] = birthISO.split("-").map(Number);

  let age = today.getFullYear() - y;
  const hasHadBirthdayThisYear =
    today.getMonth() > m - 1 ||
    (today.getMonth() === m - 1 && today.getDate() >= d);
  if (!hasHadBirthdayThisYear) age -= 1;

  return age;
}

/** Hook: updates age automatically (recomputes at next midnight) */
export default function useAge(birthISO = "2001-10-27") {
  const [age, setAge] = useState(() => calcAge(birthISO));

  useEffect(() => {
    let timer;

    const scheduleNextMidnight = () => {
      const now = new Date();
      const next = new Date(now);
      next.setHours(24, 0, 0, 0); // next local midnight
      const delay = next.getTime() - now.getTime();

      timer = setTimeout(() => {
        setAge(calcAge(birthISO));
        scheduleNextMidnight(); // self-reschedule
      }, delay);
    };

    scheduleNextMidnight();
    return () => clearTimeout(timer);
  }, [birthISO]);

  return age;
}
