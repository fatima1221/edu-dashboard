import type { BaseInstitutionTypes } from "../../types/institution";

export interface School extends BaseInstitutionTypes {
  type: "primary" | "secondary" | "highschool";
  establishedYear?: number;
  studentCount?: number;
}

export interface SchoolFilters {
  search?: string;
  city?: string;
  district?: string;
  type?: "primary" | "secondary";
  minStudents?: number;
  maxStudents?: number;
}
