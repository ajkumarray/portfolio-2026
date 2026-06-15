import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Doc, ProjectFrontmatter } from "@/lib/content";
import { Badge } from "@/components/ui/badge";

export function ProjectCard({
  project,
  basePath = "/projects",
}: {
  project: Doc<ProjectFrontmatter>;
  basePath?: string;
}) {
  const { title, summary, tags, metrics } = project.frontmatter;
  return (
    <Link
      href={`${basePath}/${project.slug}`}
      className="group relative flex h-full flex-col rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>

      <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
        {summary}
      </p>

      {metrics && metrics.length > 0 && (
        <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-5">
          {metrics.slice(0, 2).map((m) => (
            <div key={m.label}>
              <dt className="text-xs text-muted-foreground">{m.label}</dt>
              <dd className="text-base font-semibold text-foreground">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-5 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </Link>
  );
}
