import type { Metadata } from "next";
import { getExperiences } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Work I've shipped at Docquity — multi-tenant healthcare platforms, configurable systems, and microservices, each written up as a case study.",
};

export default function ExperiencePage() {
  const experiences = getExperiences();

  return (
    <Container className="py-16 sm:py-20">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Experience
        </p>
        <h1 className="mt-2 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          What I&apos;ve built at work.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Case studies from my time at Docquity — the problem, the approach, the
          trade-offs I weighed, and the scale it runs at. Each one opens on its
          own page.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {experiences.map((experience, i) => (
          <Reveal key={experience.slug} delay={i}>
            <ProjectCard project={experience} basePath="/experience" />
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
