import {
   QueryKey,
   useQuery,
   UseQueryOptions,
   UseQueryResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiBrandBrandsForGridGetQueryParams,
   ApiBrandBrandsForGridGetQueryResponse,
} from "../../models/brandController/ApiBrandBrandsForGridGet"

export const apiBrandBrandsForGridGetQueryKey = (
   params?: ApiBrandBrandsForGridGetQueryParams,
) => [`/api/brand/brands-for-grid`, ...(params ? [params] : [])] as const

export function apiBrandBrandsForGridGetQueryOptions<
   TData = ApiBrandBrandsForGridGetQueryResponse,
   TError = unknown,
>(
   params?: ApiBrandBrandsForGridGetQueryParams,
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiBrandBrandsForGridGetQueryKey(params)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/brand/brands-for-grid`,
            params,

            ...options,
         })
      },
   }
}

/**
 * @link /api/brand/brands-for-grid
 */

export function useApiBrandBrandsForGridGetHook<
   TData = ApiBrandBrandsForGridGetQueryResponse,
   TError = unknown,
>(
   params?: ApiBrandBrandsForGridGetQueryParams,
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey =
      queryOptions?.queryKey ?? apiBrandBrandsForGridGetQueryKey(params)

   const query = useQuery<TData, TError>({
      ...apiBrandBrandsForGridGetQueryOptions<TData, TError>(
         params,
         clientOptions,
      ),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
