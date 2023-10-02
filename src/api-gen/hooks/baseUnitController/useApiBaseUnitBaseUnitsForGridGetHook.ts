import {
   QueryKey,
   useQuery,
   UseQueryOptions,
   UseQueryResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiBaseUnitBaseUnitsForGridGetQueryParams,
   ApiBaseUnitBaseUnitsForGridGetQueryResponse,
} from "../../models/baseUnitController/ApiBaseUnitBaseUnitsForGridGet"

export const apiBaseUnitBaseUnitsForGridGetQueryKey = (
   params?: ApiBaseUnitBaseUnitsForGridGetQueryParams,
) =>
   [`/api/base-unit/base-units-for-grid`, ...(params ? [params] : [])] as const

export function apiBaseUnitBaseUnitsForGridGetQueryOptions<
   TData = ApiBaseUnitBaseUnitsForGridGetQueryResponse,
   TError = unknown,
>(
   params?: ApiBaseUnitBaseUnitsForGridGetQueryParams,
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiBaseUnitBaseUnitsForGridGetQueryKey(params)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/base-unit/base-units-for-grid`,
            params,

            ...options,
         })
      },
   }
}

/**
 * @link /api/base-unit/base-units-for-grid
 */

export function useApiBaseUnitBaseUnitsForGridGetHook<
   TData = ApiBaseUnitBaseUnitsForGridGetQueryResponse,
   TError = unknown,
>(
   params?: ApiBaseUnitBaseUnitsForGridGetQueryParams,
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey =
      queryOptions?.queryKey ?? apiBaseUnitBaseUnitsForGridGetQueryKey(params)

   const query = useQuery<TData, TError>({
      ...apiBaseUnitBaseUnitsForGridGetQueryOptions<TData, TError>(
         params,
         clientOptions,
      ),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
