import type {
   QueryKey,
   UseQueryResult,
   UseQueryOptions,
   QueryOptions,
} from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import client from "../../../client"
import type {
   ApiBrandBrandsGetQueryResponse,
   ApiBrandBrandsGetQueryParams,
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
         }).then((res) => res.data)
      },
   }
}

/**
 * @summary Retrieves paginated brands based on the provided parameters.
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
