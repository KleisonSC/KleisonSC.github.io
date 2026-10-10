/**
 * Project catalogue — structural metadata only. The translatable strings
 * (title, summary, description) live in the `projects.items.<slug>` message
 * namespace so they localise across EN/FR/PT/ES.
 *
 * TO ADD A PROJECT:
 *   1. Append an entry here with a unique `slug`.
 *   2. Add `projects.items.<slug>.{title,summary,description}` to each
 *      messages/<locale>.json.
 *   3. (Optional) add a matching visual in ProjectVisual.tsx; otherwise a
 *      generic one is shown.
 * The grid card and the /projects/<slug> page are generated automatically.
 */

export type ProjectCategory = "research" | "internship" | "academic";
export type ProjectStatus = "completed" | "ongoing";

export type Project = {
  slug: string;
  period: string;
  location: string;
  category: ProjectCategory;
  tags: string[];
  /** LaTeX strings rendered with KaTeX on the detail page. */
  equations?: string[];
  externalUrl?: string;
  status: ProjectStatus;
};

export const projects: Project[] = [
  {
    slug: "pavement-monitoring",
    period: "2025 – 2026",
    location: "Lyon, France",
    category: "internship",
    tags: ["FWD", "Deflection Basin", "Pavement", "Non-Destructive"],
    equations: [
      "d(r) = \\frac{(1-\\nu^2)\\,p\\,a}{E^{*}}\\,\\Phi\\!\\left(\\frac{r}{a}\\right)",
    ],
    status: "ongoing",
  },
  {
    slug: "fatigue-cementitious",
    period: "2023",
    location: "Fortaleza, Brazil",
    category: "research",
    tags: ["Fatigue", "S–N Curve", "Cementitious", "UTM-25"],
    equations: ["\\sigma_a = \\sigma_f'\\,(2N_f)^{b}"],
    status: "completed",
  },
  {
    slug: "ultrasonic-characterization",
    period: "2023 – 2024",
    location: "Fortaleza, Brazil",
    category: "research",
    tags: ["Ultrasonics", "Wave Propagation", "FRF", "NDT"],
    equations: [
      "\\frac{\\partial^2 u}{\\partial t^2} = c^2\\,\\nabla^2 u,\\quad c=\\sqrt{\\frac{E}{\\rho}}",
    ],
    status: "completed",
  },
  {
    slug: "rheology-aam",
    period: "2023",
    location: "Fortaleza, Brazil",
    category: "research",
    tags: ["Rheology", "Alkali-Activated", "Creep", "Burgers Model"],
    equations: [
      "\\varepsilon(t)=\\frac{\\sigma}{E_1}+\\frac{\\sigma}{\\eta_1}\\,t+\\frac{\\sigma}{E_2}\\left(1-e^{-E_2 t/\\eta_2}\\right)",
    ],
    status: "completed",
  },
  {
    slug: "thermomechanical-foundations",
    period: "2023",
    location: "Fortaleza, Brazil",
    category: "research",
    tags: ["Thermomechanics", "ANSYS", "Heat Transfer", "Concrete"],
    equations: [
      "\\rho\\,c_p\\,\\frac{\\partial T}{\\partial t} = k\\,\\nabla^2 T + \\dot{q}",
    ],
    status: "completed",
  },
  {
    slug: "scientific-events",
    period: "2019 – 2024",
    location: "Brazil",
    category: "academic",
    tags: ["Outreach", "Organization", "Volunteering", "Chemistry"],
    status: "completed",
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
