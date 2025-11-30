import { baseApi } from "../../api/baseApi";
import type { School, SchoolFilters } from "./types";

export const schoolsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSchools: builder.query<School[], SchoolFilters>({
      query: (params) => ({
        url: "/schools",
        method: "GET",
        params,
      }),
      providesTags: ["Schools"],
    }),

    deleteSchool: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/schools/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Schools"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetSchoolsQuery, useDeleteSchoolMutation } = schoolsApi;
