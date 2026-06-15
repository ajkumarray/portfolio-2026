import type { Metadata } from "next";
import { getPosts } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { PostCard } from "@/components/post-card";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical writing on distributed systems, reliability, performance, and developer experience.",
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <Container className="py-16 sm:py-20">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Blog
        </p>
        <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Notes on systems & reliability.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Short, practical pieces on the engineering problems I find
          interesting — written for the engineer who has to ship it.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i}>
            <PostCard post={post} />
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
