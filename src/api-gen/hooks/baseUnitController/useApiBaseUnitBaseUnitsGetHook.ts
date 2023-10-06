import {
   useQuery,
   QueryKey,
   UseQueryResult,
   UseQueryOptions,
   QueryOptions,
   UseInfiniteQueryOptions,
   UseInfiniteQueryResult,
   useInfiniteQuery,
} from "@tanstack/react-query"
import client from "../../../client"
import type {
   ApiBaseUnitBaseUnitsGetQueryResponse,
   ApiBaseUnitBaseUnitsGetQueryParams,
} from "../../models/baseUnitController/ApiBaseUnitBaseUnitsGet"

export const apiBaseUnitBaseUnitsGetQueryKey = (
   params?: ApiBaseUnitBaseUnitsGetQueryParams,
) => [`/api/base-unit/base-units`, ...(params ? [params] : [])] as const

export function apiBaseUnitBaseUnitsGetQueryOptions<
   TData = ApiBaseUnitBaseUnitsGetQueryResponse,
   TError = unknown,
>(
   params?: ApiBaseUnitBaseUnitsGetQueryParams,
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiBaseUnitBaseUnitsGetQueryKey(params)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/base-unit/base-units`,
            params,

            ...options,
         })
      },
   }
}

/**
 * @link /api/base-unit/base-units
 */

export function useApiBaseUnitBaseUnitsGetHook<
   TData = ApiBaseUnitBaseUnitsGetQueryResponse,
   TError = unknown,
>(
   params?: ApiBaseUnitBaseUnitsGetQueryParams,
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey =
      queryOptions?.queryKey ?? apiBaseUnitBaseUnitsGetQueryKey(params)

   const query = useQuery<TData, TError>({
      ...apiBaseUnitBaseUnitsGetQueryOptions<TData, TError>(
         params,
         clientOptions,
      ),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
