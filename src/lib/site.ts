export const siteConfig = {
  name: "Ajit Kumar",
  role: "Full Stack Software Engineer",
  // Short, recruiter-facing positioning line
  tagline:
    "Product-focused full-stack engineer building scalable SaaS and healthcare platforms — dynamic form engines, configuration-driven systems, and microservices, owned end to end.",
  description:
    "Portfolio of Ajit Kumar, a product-focused full-stack software engineer with 3.5+ years building scalable healthcare and SaaS platforms with Java, Spring Boot, Angular, PostgreSQL, MongoDB, Neo4j, and AWS.",
  url: "https://example.com",
  email: "mail.ajkumarray@gmail.com",
  phone: "+91-6299294533",
  location: "Gurugram, India",
  resumeUrl: "/resume.pdf",
  links: {
    github: "https://github.com/ajkumarray",
    linkedin: "https://www.linkedin.com/in/ajkumarray/",
    leetcode: "https://leetcode.com/u/ajkumarray/",
  },
} as const;

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;
