import { useEffect, useState } from "react";

/** Calculate age for a given birthdate string 'YYYY-MM-DD' */
export function calcAge(birthISO) {
  const today = new Date();
  const [y, m, d] = birthISO.split("-").map(Number);
  const birth = new Date(y, m - 1, d);

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
    // time until next midnight
    const now = new Date();
    const next = new Date(now);
    next.setHours(24, 0, 0, 0);
    const msToMidnight = next.getTime() - now.getTime();

    const first = setTimeout(() => {
      setAge(calcAge(birthISO));
      // then update once per day
      const daily = setInterval(
        () => setAge(calcAge(birthISO)),
        24 * 60 * 60 * 1000
      );
      // cleanup daily on unmount
      return () => clearInterval(daily);
    }, msToMidnight);

    return () => clearTimeout(first);
  }, [birthISO]);

  return age;
}
