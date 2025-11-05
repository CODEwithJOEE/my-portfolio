import { useState } from "react";

/* This can be used in other page example:
<Avatar src={profile.photo} alt={`${profile.name} avatar`} size="sm" ring={false} />
<Avatar src={profile.photo} alt={`Portrait of ${profile.name}`} size="md" /> */

export default function Avatar({
  src,
  alt,
  size = "full", // "full" | "md" | "sm"
  ring = true,
  className = "",
}) {
  const [error, setError] = useState(false);

  const sizeClasses =
    size === "sm" ? "w-12 h-12" : size === "md" ? "w-24 h-24" : "w-full h-full";

  return (
    <div
      className={`
        overflow-hidden rounded-full flex items-center justify-center bg-white/5
        ${ring ? "ring-2 ring-white/10" : ""}
        ${sizeClasses} ${className}
      `}
    >
      {!error ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="object-cover object-top w-full h-full rounded-full"
          onError={() => setError(true)}
        />
      ) : (
        <div className="text-xs text-gray-400 dark:text-gray-500 text-center p-2">
          No Image
        </div>
      )}
    </div>
  );
}
