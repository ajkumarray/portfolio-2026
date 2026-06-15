import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:opacity-90 shadow-sm hover:shadow-md hover:-translate-y-0.5",
        secondary:
          "bg-muted text-foreground hover:bg-accent hover:text-accent-foreground",
        outline:
          "border border-border bg-transparent hover:bg-muted hover:-translate-y-0.5",
        ghost: "bg-transparent hover:bg-muted",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-5",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children?: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.ComponentPropsWithoutRef<typeof Link>, keyof ButtonBaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as ButtonAsLink;
    const isExternal = href.startsWith("http");
    // A static asset (e.g. /resume.pdf) — last path segment has a file extension.
    // These must be plain anchors, not client-side <Link> navigations.
    const isFile = /\/[^/]+\.[^/]+$/.test(href);
    if (isExternal || isFile) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        />
      );
    }
    return <Link href={href} className={classes} {...rest} />;
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)} />
  );
}

export { buttonVariants };
