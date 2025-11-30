import type { BaseInstitutionTypes } from "../../types/institution";

export interface HighSchool extends BaseInstitutionTypes {
  specialization?: "science" | "math" | "literature" | "mixed";
  hasDormitory?: boolean;
}

export interface HighSchoolFilters {
  search?: string;
  city?: string;
  district?: string;
  specialization?: "science" | "math" | "literature" | "mixed";
  hasDormitory?: boolean;
}
