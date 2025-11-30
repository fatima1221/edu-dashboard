import { baseApi } from "../../api/baseApi";
import type { University, UniversityFilters } from "./types";

export const universitiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUniversities: builder.query<University[], UniversityFilters>({
      query: (params) => ({
        url: "/universities",
        method: "GET",
        params,
      }),
      providesTags: ["Universities"],
    }),

    deleteUniversity: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/universities/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Universities"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUniversitiesQuery, useDeleteUniversityMutation } =
  universitiesApi;
