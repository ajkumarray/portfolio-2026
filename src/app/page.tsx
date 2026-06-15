import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { getFeaturedExperiences, getProjects, getPosts } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { PostCard } from "@/components/post-card";

const stats = [
  { value: "3.5+", label: "Years of full-stack experience" },
  { value: "20+", label: "Pharma clients served" },
  { value: "45k", label: "Patients on platforms I build" },
  { value: "30+", label: "Healthcare programs powered" },
];

export default function Home() {
  const experiences = getFeaturedExperiences();
  const projects = getProjects().slice(0, 2);
  const posts = getPosts().slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Soft ambient accent glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[840px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        />
        <Container className="relative py-20 sm:py-28">
          <Reveal>
            <Badge className="mb-5 border-primary/30 bg-accent text-accent-foreground">
              Open to full-stack & backend SDE roles
            </Badge>
          </Reveal>

          <Reveal delay={1}>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Hi, I&apos;m {siteConfig.name.split(" ")[0]} — I build full-stack
              products that are configurable, fast, and built to reuse.
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              {siteConfig.tagline}
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/projects" size="lg">
                View my work <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href={siteConfig.resumeUrl} variant="outline" size="lg">
                <Download className="h-4 w-4" /> Download résumé
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Stats */}
      <Container>
        <Reveal>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-card p-6">
                <dt className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>

      {/* Experience */}
      <Container className="py-20 sm:py-24">
        <SectionHeading
          eyebrow="Experience"
          title="Work that runs at scale"
          description="Platforms I've built at Docquity — the problem, the trade-offs, and the scale they operate at."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {experiences.map((experience, i) => (
            <Reveal key={experience.slug} delay={i}>
              <ProjectCard project={experience} basePath="/experience" />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <Link
            href="/experience"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:opacity-80"
          >
            See all experience <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </Container>

      {/* Personal projects */}
      <Container className="pb-4">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built on my own"
          description="Side projects I designed, shipped, and own end to end."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:opacity-80"
          >
            See all projects <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </Container>

      {/* Recent writing */}
      <Container className="py-20 sm:py-24">
        <SectionHeading
          eyebrow="Writing"
          title="Notes on systems & reliability"
          description="Short, practical pieces on the engineering problems I find interesting."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:opacity-80"
          >
            Read the blog <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </Container>

      {/* CTA */}
      <Container className="py-20 sm:py-24">
        <Reveal className="relative overflow-hidden rounded-2xl border border-border bg-card p-10 text-center sm:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-primary/5"
          />
          <div className="relative">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Let&apos;s build something reliable together.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              I&apos;m open to full-stack and backend engineering roles. Happy to
              talk through a product you&apos;re building or a system you&apos;re
              trying to scale.
            </p>
            <div className="mt-7">
              <Button href="/contact" size="lg">
                Get in touch <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
