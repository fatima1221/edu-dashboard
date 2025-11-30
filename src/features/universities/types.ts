import type { BaseInstitutionTypes } from "../../types/institution";

export interface University extends BaseInstitutionTypes {
  corpora?: { id: number; name: string }[];
}

export interface UniversityFilters {
  name?: string;
  yearFrom?: number;
  yearTo?: number;
}
