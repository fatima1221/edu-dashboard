// src/api/createInstitutionApi.ts

import { baseApi } from "./baseApi";

export const createInstitutionApi = <
  TEntity,
  TFilters extends Record<string, any>
>(
  entity: string,
  tagType: "Universities" | "HighSchools" | "Schools"
) =>
  baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getEntities: builder.query<TEntity[], TFilters>({
        query: (params) => ({
          url: `/${entity}`,
          method: "GET",
          params,
        }),
        providesTags: [tagType],
      }),

      deleteEntity: builder.mutation<{ success: boolean }, number>({
        query: (id) => ({
          url: `/${entity}/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: [tagType],
      }),
    }),
  });
