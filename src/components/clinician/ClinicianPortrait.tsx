import { ImageWithFallback } from "../figma/ImageWithFallback";
import { initialsFor } from "../../lib/clinician";

type Props = {
  src: string | null;
  name: string;
  className?: string;
  // Default visual treatment matches the editorial team grid; override className for other cases.
};

/**
 * Renders a clinician portrait, falling back to a tasteful initials monogram
 * when no image is supplied (e.g. associate hasn't uploaded a headshot yet).
 */
export function ClinicianPortrait({ src, name, className = "" }: Props) {
  if (src) {
    return (
      <ImageWithFallback
        src={src}
        alt={name}
        className={`w-full h-full object-cover ${className}`}
      />
    );
  }
  const initials = initialsFor(name);
  return (
    <div
      className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary/60 to-secondary/30 ${className}`}
      role="img"
      aria-label={`${name} — portrait pending`}
    >
      <span className="font-heading font-bold text-foreground/40 text-7xl lg:text-8xl select-none">
        {initials}
      </span>
    </div>
  );
}
