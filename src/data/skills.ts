/**
 * Skills data. Levels are 0–100 for the animated proficiency bars; the group
 * and item names are stable keys, with display labels coming from the `about`
 * message namespace (so category titles translate, tool names stay as-is).
 */

export type Skill = { name: string; level: number };
export type SkillGroup = { key: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    key: "programming",
    skills: [
      { name: "Python", level: 85 },
      { name: "MATLAB", level: 80 },
      { name: "LaTeX", level: 75 },
    ],
  },
  {
    key: "simulation",
    skills: [
      { name: "Ansys", level: 85 },
      { name: "Comsol", level: 80 },
      { name: "Abaqus", level: 75 },
    ],
  },
  {
    key: "cad",
    skills: [
      { name: "AutoCAD", level: 85 },
      { name: "Revit", level: 80 },
      { name: "SolidWorks", level: 80 },
      { name: "Civil 3D", level: 75 },
      { name: "Robot", level: 70 },
    ],
  },
  {
    key: "experimental",
    skills: [
      { name: "UTM-25", level: 85 },
      { name: "LabView", level: 80 },
      { name: "Rheology equip.", level: 75 },
      { name: "Climatic chamber", level: 70 },
    ],
  },
  {
    key: "tools",
    skills: [
      { name: "Office", level: 90 },
      { name: "MS Project", level: 75 },
      { name: "Git", level: 75 },
      { name: "Alizé", level: 70 },
    ],
  },
];

/** Languages are shown as badges with CEFR-style labels rather than bars. */
export type Language = { name: string; levelKey: "native" | "b2" };

export const languages: Language[] = [
  { name: "Portuguese", levelKey: "native" },
  { name: "English", levelKey: "b2" },
  { name: "French", levelKey: "b2" },
  { name: "Spanish", levelKey: "b2" },
];
