/**
 * PhD section data — designed to be updated throughout the doctorate.
 *
 * - `researchAxes` and `phdTimeline` carry stable keys; their copy is in the
 *   `phd` message namespace (translatable).
 * - `publications` and `updates` are the frequently-edited feeds: keep adding
 *   entries here (English is fine) and the page updates automatically.
 */

export const researchAxes = [
  { key: "fwd" },
  { key: "cold" },
  { key: "freeze" },
  { key: "monitoring" },
] as const;

export type PhdPhase = {
  id: string;
  status: "done" | "current" | "upcoming";
};

export const phdTimeline: PhdPhase[] = [
  // PhD begins Winter 2027, so nothing is underway yet — all upcoming.
  { id: "w2026", status: "upcoming" },
  { id: "s2026", status: "upcoming" },
  { id: "y2027", status: "upcoming" },
  { id: "future", status: "upcoming" },
];

export type Publication = {
  title: string;
  venue: string;
  year: string;
  url?: string;
  type: "journal" | "conference" | "preprint";
};

/** Empty for now — add entries as they appear. */
export const publications: Publication[] = [];

export type Update = {
  date: string; // ISO (YYYY-MM-DD) — shown formatted
  title: string;
  note: string;
  tag?: "milestone" | "reading" | "experiment" | "writing";
};

/** Changelog feed — most recent first. Edit freely. */
export const updates: Update[] = [
  {
    date: "2027-01-12",
    title: "PhD kickoff at ÉTS Montréal",
    note: "Started the doctorate — onboarding, coursework selection and first meetings with the research group.",
    tag: "milestone",
  },
  {
    date: "2027-01-20",
    title: "Literature review — FWD interpretation",
    note: "Surveying back-calculation methods for deflection basins and their sensitivity to temperature.",
    tag: "reading",
  },
];
