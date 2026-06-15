import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { getExperiences, getProjects, getPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} — background, skills, and experience.`,
};

const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["Java", "TypeScript", "JavaScript", "Python", "C++"],
  },
  {
    group: "Backend",
    items: [
      "Spring Boot",
      "Spring Security",
      "JPA / Hibernate",
      "REST APIs",
      "JWT",
      "NestJS",
      "Node.js",
      "gRPC",
    ],
  },
  {
    group: "Frontend",
    items: [
      "Angular",
      "React",
      "Next.js",
      "NgRx",
      "RxJS",
      "Tailwind CSS",
      "PrimeNG",
      "SCSS",
    ],
  },
  {
    group: "Databases & Caching",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Neo4j", "Redis"],
  },
  {
    group: "Cloud & DevOps",
    items: [
      "AWS (EC2, S3, Secrets Manager)",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Jenkins",
      "Maven",
    ],
  },
  {
    group: "Architecture & Concepts",
    items: [
      "Microservices",
      "Distributed Systems",
      "RBAC",
      "OAuth / SSO",
      "Config-Driven Systems",
      "Dynamic Form Engines",
      "System Design",
    ],
  },
];

const experience = [
  {
    role: "Software Development Engineer",
    company: "Docquity",
    period: "Jan 2023 — Present · Gurugram",
    summary:
      "Building scalable healthcare platforms end to end — configurable form engines, onboarding, and microservices — for pharma clients across multiple countries.",
  },
];

const education = [
  {
    school: "Birla Institute of Technology, Mesra",
    degree: "B.Tech, Information Technology",
    period: "2019 — 2023 · CGPA 8.14 / 10",
  },
];

export default function AboutPage() {
  const experiences = getExperiences();
  const projects = getProjects();
  const posts = getPosts();

  return (
    <Container className="py-16 sm:py-20">
      {/* Intro */}
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          About
        </p>
        <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Full-stack engineer who likes turning messy problems into reusable
          systems.
        </h1>
      </Reveal>

      <div className="mt-8 grid gap-12 lg:grid-cols-3">
        <Reveal className="lg:col-span-2" delay={1}>
          <div className="space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              I&apos;m a product-focused full-stack engineer with 3.5+ years
              building scalable SaaS and healthcare platforms at{" "}
              <span className="text-foreground">Docquity</span>, which serves
              healthcare professionals, patients, and pharma stakeholders across
              multiple countries. I work across the stack — Angular and
              React/Next.js on the front, Java/Spring Boot and Node.js on the
              back.
            </p>
            <p>
              A theme runs through my work: I like building things{" "}
              <span className="text-foreground">once, configurably</span>, so a
              team can reuse them instead of rebuilding. That&apos;s how a legacy
              Patient Assistance Program became a metadata-driven form engine
              serving tens of thousands of patients, how onboarding became an
              installable npm package, and how a pile of one-off surveys became a
              single configurable platform. When the data calls for it, I&apos;m
              happy to reach past the relational default — modeling
              healthcare-professional relationships in Neo4j for reusable,
              graph-based audience targeting.
            </p>
            <p>
              I care about end-to-end ownership and the parts users never see:
              RBAC and secure multi-role access, caching, clean service
              boundaries, and leaving a codebase easier to extend than I found it.
            </p>
          </div>

          <div className="mt-8">
            <Button href={siteConfig.resumeUrl} variant="outline">
              <Download className="h-4 w-4" /> Download résumé (PDF)
            </Button>
          </div>
        </Reveal>

        {/* Skills */}
        <Reveal className="space-y-6" delay={2}>
          {skills.map((s) => (
            <div key={s.group}>
              <h3 className="text-sm font-semibold">{s.group}</h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {s.items.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>

      {/* Experience */}
      <div className="mt-20">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Experience
            </h2>
            <Link
              href="/experience"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:opacity-80"
            >
              All case studies <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 border-l border-border pl-6">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i}>
              <div className="relative">
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-lg font-semibold">
                    {job.role}{" "}
                    <span className="font-normal text-muted-foreground">
                      · {job.company}
                    </span>
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {job.period}
                  </span>
                </div>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  {job.summary}
                </p>

                {/* Case studies — each opens its own page */}
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {experiences.map((e) => (
                    <li key={e.slug}>
                      <Link
                        href={`/experience/${e.slug}`}
                        className="group flex h-full items-start justify-between gap-3 rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
                      >
                        <div>
                          <p className="text-sm font-medium">
                            {e.frontmatter.title}
                          </p>
                          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                            {e.frontmatter.summary}
                          </p>
                        </div>
                        <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="mt-16">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Projects
            </h2>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:opacity-80"
            >
              All projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <Reveal>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group flex h-full items-start justify-between gap-3 rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
                >
                  <div>
                    <p className="text-sm font-medium">{p.frontmatter.title}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {p.frontmatter.summary}
                    </p>
                  </div>
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Writing */}
      <div className="mt-16">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Writing
            </h2>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:opacity-80"
            >
              All posts <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <Reveal>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full items-start justify-between gap-3 rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
                >
                  <div>
                    <p className="text-sm font-medium">{post.frontmatter.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatDate(post.frontmatter.date)} · {post.readingTime}
                    </p>
                  </div>
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Education */}
      <div className="mt-16">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Education
          </h2>
        </Reveal>
        <div className="mt-6 space-y-4">
          {education.map((e, i) => (
            <Reveal key={e.school} delay={i}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 rounded-lg border border-border bg-card p-5">
                <div>
                  <h3 className="font-semibold">{e.school}</h3>
                  <p className="text-sm text-muted-foreground">{e.degree}</p>
                </div>
                <span className="text-sm text-muted-foreground">{e.period}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Container>
  );
}
