/**
 * Career / academic timeline. `id` keys into the `about.timeline.<id>`
 * messages (title, org, desc); `year`, `type` and `status` drive the HUD.
 */

export type TimelineType = "education" | "research" | "experience";

export type TimelineNode = {
  id: string;
  year: string;
  type: TimelineType;
  status?: "ongoing" | "incoming";
};

export const timeline: TimelineNode[] = [
  { id: "bsc", year: "2021", type: "education" },
  { id: "fatigue", year: "2023", type: "research" },
  { id: "rheology", year: "2023", type: "research" },
  { id: "thermo", year: "2023", type: "research" },
  { id: "ultrasonic", year: "2023–24", type: "research" },
  { id: "insa", year: "2024", type: "education", status: "ongoing" },
  { id: "master", year: "2025", type: "education", status: "ongoing" },
  { id: "eiffage", year: "2025–26", type: "experience" },
  { id: "phd", year: "2027", type: "research", status: "incoming" },
];
