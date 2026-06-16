import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/contact-form";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}.`,
};

const directLinks = [
  { Icon: Mail, label: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { Icon: LinkedinIcon, label: "LinkedIn", href: siteConfig.links.linkedin },
  { Icon: GithubIcon, label: "GitHub", href: siteConfig.links.github },
  { Icon: LeetcodeIcon, label: "LeetCode", href: siteConfig.links.leetcode },
];

export default function ContactPage() {
  return (
    <Container className="py-16 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Contact
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Let&apos;s talk.
          </h1>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">
            Whether it&apos;s a full-stack role, an interesting product, or just
            a good engineering conversation — my inbox is open.
          </p>

          <div className="mt-8 space-y-3">
            {directLinks.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="h-4 w-4 text-primary" />
                {label}
              </a>
            ))}
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              {siteConfig.location}
            </div>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <ContactForm />
        </Reveal>
      </div>
    </Container>
  );
}
