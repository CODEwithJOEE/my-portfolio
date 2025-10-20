import { useEffect, useState } from "react";

/**
 * useTypewriter
 * Cycles through words with a type/delete effect.
 */
export default function useTypewriter(
  words,
  {
    typeSpeed = 90, // ms per char while typing
    deleteSpeed = 50, // ms per char while deleting
    holdTime = 1200, // ms to hold full word before deleting
    gapTime = 300, // ms to pause after deleting before typing next
    loop = true,
  } = {}
) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0); // which word
  const [phase, setPhase] = useState("type"); // "type" | "hold" | "delete" | "gap"

  useEffect(() => {
    const current = words[index % words.length];
    let t;

    if (phase === "type") {
      if (text.length < current.length) {
        t = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typeSpeed
        );
      } else {
        t = setTimeout(() => setPhase("hold"), holdTime);
      }
    } else if (phase === "hold") {
      t = setTimeout(() => setPhase("delete"), holdTime);
    } else if (phase === "delete") {
      if (text.length > 0) {
        t = setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          deleteSpeed
        );
      } else {
        t = setTimeout(() => {
          setPhase("gap");
          setIndex((i) =>
            loop ? (i + 1) % words.length : Math.min(i + 1, words.length - 1)
          );
        }, gapTime);
      }
    } else if (phase === "gap") {
      t = setTimeout(() => setPhase("type"), gapTime);
    }

    return () => clearTimeout(t);
  }, [
    text,
    phase,
    index,
    words,
    typeSpeed,
    deleteSpeed,
    holdTime,
    gapTime,
    loop,
  ]);

  // when index changes (new word), reset phase to type
  useEffect(() => {
    setPhase("type");
  }, [index]);

  return text;
}
