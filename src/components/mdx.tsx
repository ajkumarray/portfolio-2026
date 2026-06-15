import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import { cn } from "@/lib/utils";

const prettyCodeOptions: Options = {
  theme: "github-dark",
  keepBackground: true,
  defaultLang: "plaintext",
};

const components = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      className="mt-12 scroll-mt-24 text-2xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3
      className="mt-8 scroll-mt-24 text-xl font-semibold tracking-tight"
      {...props}
    />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="mt-5 leading-7 text-foreground/90" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="mt-5 list-disc space-y-2 pl-6 text-foreground/90" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-6 text-foreground/90"
      {...props}
    />
  ),
  a: ({ href = "", ...props }: React.ComponentProps<"a">) => {
    const external = href.startsWith("http");
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline-offset-4 hover:underline"
          {...props}
        />
      );
    }
    return (
      <Link
        href={href}
        className="font-medium text-primary underline-offset-4 hover:underline"
        {...props}
      />
    );
  },
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="mt-6 border-l-2 border-primary/50 pl-5 italic text-muted-foreground"
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.ComponentProps<"pre">) => (
    <pre
      className={cn(
        "mt-6 overflow-x-auto rounded-lg border border-border p-4 text-sm [&_code]:bg-transparent [&_code]:p-0",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: React.ComponentProps<"code">) => (
    <code
      className={cn(
        "rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]",
        className
      )}
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-border" />,
};

export function MDX({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
        },
      }}
    />
  );
}
