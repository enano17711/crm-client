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
   ApiItemItemByIdIdGetQueryResponse,
   ApiItemItemByIdIdGetPathParams,
} from "../../models/itemController/ApiItemItemByIdIdGet"

export const apiItemItemByIdIdGetQueryKey = (
   id: ApiItemItemByIdIdGetPathParams["id"],
) => [`/api/item/item-by-id/${id}`] as const

export function apiItemItemByIdIdGetQueryOptions<
   TData = ApiItemItemByIdIdGetQueryResponse,
   TError = unknown,
>(
   id: ApiItemItemByIdIdGetPathParams["id"],
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiItemItemByIdIdGetQueryKey(id)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/item/item-by-id/${id}`,

            ...options,
         })
      },
   }
}

/**
 * @link /api/item/item-by-id/:id
 */

export function useApiItemItemByIdIdGetHook<
   TData = ApiItemItemByIdIdGetQueryResponse,
   TError = unknown,
>(
   id: ApiItemItemByIdIdGetPathParams["id"],
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey = queryOptions?.queryKey ?? apiItemItemByIdIdGetQueryKey(id)

   const query = useQuery<TData, TError>({
      ...apiItemItemByIdIdGetQueryOptions<TData, TError>(id, clientOptions),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
