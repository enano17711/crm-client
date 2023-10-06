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
   ApiOrderReturnOrderReturnIdGetQueryResponse,
   ApiOrderReturnOrderReturnIdGetPathParams,
} from "../../models/orderReturnController/ApiOrderReturnOrderReturnIdGet"

export const apiOrderReturnOrderReturnIdGetQueryKey = (
   id: ApiOrderReturnOrderReturnIdGetPathParams["id"],
) => [`/api/order-return/order-return/${id}`] as const

export function apiOrderReturnOrderReturnIdGetQueryOptions<
   TData = ApiOrderReturnOrderReturnIdGetQueryResponse,
   TError = unknown,
>(
   id: ApiOrderReturnOrderReturnIdGetPathParams["id"],
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiOrderReturnOrderReturnIdGetQueryKey(id)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/order-return/order-return/${id}`,

            ...options,
         })
      },
   }
}

/**
 * @link /api/order-return/order-return/:id
 */

export function useApiOrderReturnOrderReturnIdGetHook<
   TData = ApiOrderReturnOrderReturnIdGetQueryResponse,
   TError = unknown,
>(
   id: ApiOrderReturnOrderReturnIdGetPathParams["id"],
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey =
      queryOptions?.queryKey ?? apiOrderReturnOrderReturnIdGetQueryKey(id)

   const query = useQuery<TData, TError>({
      ...apiOrderReturnOrderReturnIdGetQueryOptions<TData, TError>(
         id,
         clientOptions,
      ),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
