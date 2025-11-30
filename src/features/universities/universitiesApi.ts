import { createInstitutionApi } from "../../api/createInstitutionApi";
import type { University, UniversityFilters } from "./types";

export const universitiesApi = createInstitutionApi<
  University,
  UniversityFilters
>("universities", "Universities");

export const {
  useGetEntitiesQuery: useGetUniversitiesQuery,
  useDeleteEntityMutation: useDeleteUniversityMutation,
} = universitiesApi;
