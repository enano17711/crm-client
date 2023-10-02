import {
   QueryKey,
   useQuery,
   UseQueryOptions,
   UseQueryResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiUnitUnitsForGridGetQueryParams,
   ApiUnitUnitsForGridGetQueryResponse,
} from "../../models/unitController/ApiUnitUnitsForGridGet"

export const apiUnitUnitsForGridGetQueryKey = (
   params?: ApiUnitUnitsForGridGetQueryParams,
) => [`/api/unit/units-for-grid`, ...(params ? [params] : [])] as const

export function apiUnitUnitsForGridGetQueryOptions<
   TData = ApiUnitUnitsForGridGetQueryResponse,
   TError = unknown,
>(
   params?: ApiUnitUnitsForGridGetQueryParams,
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiUnitUnitsForGridGetQueryKey(params)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/unit/units-for-grid`,
            params,

            ...options,
         })
      },
   }
}

/**
 * @link /api/unit/units-for-grid
 */

export function useApiUnitUnitsForGridGetHook<
   TData = ApiUnitUnitsForGridGetQueryResponse,
   TError = unknown,
>(
   params?: ApiUnitUnitsForGridGetQueryParams,
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey =
      queryOptions?.queryKey ?? apiUnitUnitsForGridGetQueryKey(params)

   const query = useQuery<TData, TError>({
      ...apiUnitUnitsForGridGetQueryOptions<TData, TError>(
         params,
         clientOptions,
      ),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
