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
   ApiBrandBrandIdGetQueryResponse,
   ApiBrandBrandIdGetPathParams,
} from "../../models/brandController/ApiBrandBrandIdGet"

export const apiBrandBrandIdGetQueryKey = (
   id: ApiBrandBrandIdGetPathParams["id"],
) => [`/api/brand/brand/${id}`] as const

export function apiBrandBrandIdGetQueryOptions<
   TData = ApiBrandBrandIdGetQueryResponse,
   TError = unknown,
>(
   id: ApiBrandBrandIdGetPathParams["id"],
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiBrandBrandIdGetQueryKey(id)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/brand/brand/${id}`,

            ...options,
         })
      },
   }
}

/**
 * @link /api/brand/brand/:id
 */

export function useApiBrandBrandIdGetHook<
   TData = ApiBrandBrandIdGetQueryResponse,
   TError = unknown,
>(
   id: ApiBrandBrandIdGetPathParams["id"],
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey = queryOptions?.queryKey ?? apiBrandBrandIdGetQueryKey(id)

   const query = useQuery<TData, TError>({
      ...apiBrandBrandIdGetQueryOptions<TData, TError>(id, clientOptions),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
