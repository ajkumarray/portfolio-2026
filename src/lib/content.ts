import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Metric = { label: string; value: string };

export type ProjectFrontmatter = {
  title: string;
  summary: string;
  date: string;
  role: string;
  tags: string[];
  stack: string[];
  metrics?: Metric[];
  repo?: string;
  demo?: string;
  featured?: boolean;
};

// Work experience (e.g. Docquity) and personal projects share the same shape.
export type ExperienceFrontmatter = ProjectFrontmatter;

export type PostFrontmatter = {
  title: string;
  summary: string;
  date: string;
  tags: string[];
};

export type Doc<T> = {
  slug: string;
  content: string;
  readingTime: string;
  frontmatter: T;
};

function readCollection<T>(
  collection: "projects" | "experience" | "blog"
): Doc<T>[] {
  const dir = path.join(CONTENT_DIR, collection);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { content, data } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ""),
        content,
        readingTime: readingTime(content).text,
        frontmatter: data as T,
      };
    })
    .sort(
      (a, b) =>
        new Date((b.frontmatter as PostFrontmatter).date).getTime() -
        new Date((a.frontmatter as PostFrontmatter).date).getTime()
    );
}

export function getProjects(): Doc<ProjectFrontmatter>[] {
  return readCollection<ProjectFrontmatter>("projects");
}

export function getProject(slug: string): Doc<ProjectFrontmatter> | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getExperiences(): Doc<ExperienceFrontmatter>[] {
  return readCollection<ExperienceFrontmatter>("experience");
}

export function getFeaturedExperiences(): Doc<ExperienceFrontmatter>[] {
  return getExperiences().filter((e) => e.frontmatter.featured);
}

export function getExperience(
  slug: string
): Doc<ExperienceFrontmatter> | undefined {
  return getExperiences().find((e) => e.slug === slug);
}

export function getPosts(): Doc<PostFrontmatter>[] {
  return readCollection<PostFrontmatter>("blog");
}

export function getPost(slug: string): Doc<PostFrontmatter> | undefined {
  return getPosts().find((p) => p.slug === slug);
}
