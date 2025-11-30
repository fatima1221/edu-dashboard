import type { HighSchool, HighSchoolFilters } from "./types";
import { createInstitutionApi } from "../../api/createInstitutionApi";

export const highSchoolsApi = createInstitutionApi<
  HighSchool,
  HighSchoolFilters
>("high-schools", "HighSchools");

export const {
  useGetEntitiesQuery: useGetHighSchoolsQuery,
  useDeleteEntityMutation: useDeleteHighSchoolMutation,
} = highSchoolsApi;
