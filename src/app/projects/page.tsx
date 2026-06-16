import type { Metadata } from "next";
import { getProjects } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Things I've built on my own time — side projects I designed, shipped, and own end to end.",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <Container className="py-16 sm:py-20">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Projects
        </p>
        <h1 className="mt-2 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Things I&apos;ve built on my own.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Side projects I own end to end — designed, built, and shipped to
          production. More on the way.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
