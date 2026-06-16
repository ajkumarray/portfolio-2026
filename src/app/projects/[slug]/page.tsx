import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getProject, getProjects } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MDX } from "@/components/mdx";
import { GithubIcon } from "@/components/icons";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { title, summary, date, role, stack, metrics, repo, demo } =
    project.frontmatter;

  return (
    <Container className="py-16 sm:py-20">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All projects
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="text-sm text-muted-foreground">
          {role} · {formatDate(date)}
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">{summary}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          {repo && (
            <Button href={repo} variant="outline" size="sm">
              <GithubIcon className="h-4 w-4" /> Source
            </Button>
          )}
          {demo && (
            <Button href={demo} variant="outline" size="sm">
              <ExternalLink className="h-4 w-4" /> Live demo
            </Button>
          )}
        </div>
      </header>

      {/* Metrics band */}
      {metrics && metrics.length > 0 && (
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="bg-card p-5">
              <dt className="text-xs text-muted-foreground">{m.label}</dt>
              <dd className="mt-1 text-xl font-semibold tracking-tight">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_220px]">
        {/* Body */}
        <article className="max-w-2xl">
          <MDX source={project.content} />
        </article>

        {/* Stack sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <h3 className="text-sm font-semibold">Tech stack</h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {stack.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
        </aside>
      </div>
    </Container>
  );
}
