import { baseApi } from "./baseApi";
import type { InstitutionEntity } from "./institutionMap";
import { institutionMap } from "./institutionMap";

export function createInstitutionApi<
  TEntity,
  TFilters extends Record<string, any>,
  TEntityName extends InstitutionEntity
>(entity: TEntityName) {
  const { tag, prefix } = institutionMap[entity];

  return baseApi.injectEndpoints({
    endpoints: (builder) => ({
      [`get${prefix}`]: builder.query<TEntity[], TFilters>({
        query: (params) => ({
          url: `/${entity}`,
          method: "GET",
          params,
        }),
        providesTags: [tag],
      }),

      [`delete${prefix}`]: builder.mutation<{ success: boolean }, string>({
        query: (id) => ({
          url: `/${entity}/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: [tag],
      }),
    }),
    overrideExisting: false,
  });
}
