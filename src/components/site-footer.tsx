import Link from "next/link";
import { Mail } from "lucide-react";
import { navItems, siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "@/components/icons";

const socials = [
  { href: siteConfig.links.github, label: "GitHub", Icon: GithubIcon },
  { href: siteConfig.links.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: siteConfig.links.leetcode, label: "LeetCode", Icon: LeetcodeIcon },
  { href: `mailto:${siteConfig.email}`, label: "Email", Icon: Mail },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <Container className="flex flex-col gap-8 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold">
            {siteConfig.name}
            <span className="text-primary">.</span>
          </p>
          <p className="max-w-xs text-sm text-muted-foreground">
            {siteConfig.role} · {siteConfig.location}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          ))}
        </div>
      </Container>

      <Container className="border-t border-border/60 py-5">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js &
          Tailwind CSS.
        </p>
      </Container>
    </footer>
  );
}
