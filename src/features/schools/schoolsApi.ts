import type { School, SchoolFilters } from "./types";
import { createInstitutionApi } from "../../api/createInstitutionApi";

export const schoolsApi = createInstitutionApi<School, SchoolFilters>(
  "schools",
  "Schools"
);

export const {
  useGetEntitiesQuery: useGetSchoolsQuery,
  useDeleteEntityMutation: useDeleteSchoolMutation,
} = schoolsApi;
