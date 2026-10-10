/**
 * Central site configuration — identity, social links, CV path. Edit here to
 * update the header, footer and contact page at once.
 */
export const site = {
  name: "Kleison Silva",
  fullName: "Kleison Silva Carvalho",
  role: "Civil Engineer",
  email: "Kleison.silva-Carvalho@insa-rennes.fr",
  cvPath: "/cv/Kleison_Silva_CV.pdf",
  socials: {
    email: "mailto:Kleison.silva-Carvalho@insa-rennes.fr",
    linkedin: "https://www.linkedin.com/in/kleisonsilvaengenheiro",
    github: "https://github.com/KleisonSC",
    kaggle: "https://www.kaggle.com/kleisonsilva",
  },
} as const;

/** Primary navigation — hrefs are locale-relative (next-intl <Link/>). */
export const navItems = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/projects", key: "projects" },
  { href: "/phd", key: "phd" },
  { href: "/contact", key: "contact" },
] as const;
