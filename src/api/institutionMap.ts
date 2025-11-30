export const institutionMap = {
  universities: {
    tag: "Universities",
    prefix: "Universities",
  },
  schools: {
    tag: "Schools",
    prefix: "Schools",
  },
  "high-schools": {
    tag: "HighSchools",
    prefix: "HighSchools",
  },
} as const;

export type InstitutionEntity = keyof typeof institutionMap;
export type InstitutionTag = (typeof institutionMap)[InstitutionEntity]["tag"];
export type InstitutionPrefix =
  (typeof institutionMap)[InstitutionEntity]["prefix"];
