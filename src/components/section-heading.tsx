import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="max-w-2xl">
      {eyebrow && (
        <p className="mb-3 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-widest text-primary">
          <ChevronRight className="h-4 w-4" strokeWidth={3} />
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
