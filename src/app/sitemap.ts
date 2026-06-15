import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getExperiences, getPosts, getProjects } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const routes = [
    "",
    "/about",
    "/experience",
    "/projects",
    "/blog",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const experiences = getExperiences().map((e) => ({
    url: `${base}/experience/${e.slug}`,
    lastModified: new Date(e.frontmatter.date),
  }));

  const projects = getProjects().map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(p.frontmatter.date),
  }));

  const posts = getPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.frontmatter.date),
  }));

  return [...routes, ...experiences, ...projects, ...posts];
}
