import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Doc, PostFrontmatter } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function PostCard({ post }: { post: Doc<PostFrontmatter> }) {
  const { title, summary, date, tags } = post.frontmatter;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <time dateTime={date}>{formatDate(date)}</time>
        <span>·</span>
        <span>{post.readingTime}</span>
      </div>

      <h3 className="mt-2 text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
        {summary}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 2).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
      </div>
    </Link>
  );
}
