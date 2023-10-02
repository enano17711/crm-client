import {
   QueryKey,
   useQuery,
   UseQueryOptions,
   UseQueryResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiBrandBrandsGetQueryParams,
   ApiBrandBrandsGetQueryResponse,
} from "../../models/brandController/ApiBrandBrandsGet"

export const apiBrandBrandsGetQueryKey = (
   params?: ApiBrandBrandsGetQueryParams,
) => [`/api/brand/brands`, ...(params ? [params] : [])] as const

export function apiBrandBrandsGetQueryOptions<
   TData = ApiBrandBrandsGetQueryResponse,
   TError = unknown,
>(
   params?: ApiBrandBrandsGetQueryParams,
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiBrandBrandsGetQueryKey(params)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/brand/brands`,
            params,

            ...options,
         })
      },
   }
}

/**
 * @link /api/brand/brands
 */

export function useApiBrandBrandsGetHook<
   TData = ApiBrandBrandsGetQueryResponse,
   TError = unknown,
>(
   params?: ApiBrandBrandsGetQueryParams,
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey = queryOptions?.queryKey ?? apiBrandBrandsGetQueryKey(params)

   const query = useQuery<TData, TError>({
      ...apiBrandBrandsGetQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
