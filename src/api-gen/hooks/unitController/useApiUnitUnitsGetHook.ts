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
   ApiUnitUnitsGetQueryResponse,
   ApiUnitUnitsGetQueryParams,
} from "../../models/unitController/ApiUnitUnitsGet"

export const apiUnitUnitsGetQueryKey = (params?: ApiUnitUnitsGetQueryParams) =>
   [`/api/unit/units`, ...(params ? [params] : [])] as const

export function apiUnitUnitsGetQueryOptions<
   TData = ApiUnitUnitsGetQueryResponse,
   TError = unknown,
>(
   params?: ApiUnitUnitsGetQueryParams,
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiUnitUnitsGetQueryKey(params)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/unit/units`,
            params,

            ...options,
         })
      },
   }
}

/**
 * @link /api/unit/units
 */

export function useApiUnitUnitsGetHook<
   TData = ApiUnitUnitsGetQueryResponse,
   TError = unknown,
>(
   params?: ApiUnitUnitsGetQueryParams,
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey = queryOptions?.queryKey ?? apiUnitUnitsGetQueryKey(params)

   const query = useQuery<TData, TError>({
      ...apiUnitUnitsGetQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
