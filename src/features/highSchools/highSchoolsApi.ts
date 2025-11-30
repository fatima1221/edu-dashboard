import { baseApi } from "../../api/baseApi";
import type { HighSchool, HighSchoolFilters } from "./types";

export const highSchoolsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHighSchools: builder.query<HighSchool[], HighSchoolFilters>({
      query: (params) => ({
        url: "/high-schools",
        method: "GET",
        params,
      }),
      providesTags: ["HighSchools"],
    }),

    deleteHighSchool: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/high-schools/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["HighSchools"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetHighSchoolsQuery, useDeleteHighSchoolMutation } =
  highSchoolsApi;
