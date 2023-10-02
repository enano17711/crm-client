import {
   QueryKey,
   useQuery,
   UseQueryOptions,
   UseQueryResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiOrderOrderIdGetPathParams,
   ApiOrderOrderIdGetQueryResponse,
} from "../../models/orderController/ApiOrderOrderIdGet"

export const apiOrderOrderIdGetQueryKey = (
   id: ApiOrderOrderIdGetPathParams["id"],
) => [`/api/order/order/${id}`] as const

export function apiOrderOrderIdGetQueryOptions<
   TData = ApiOrderOrderIdGetQueryResponse,
   TError = unknown,
>(
   id: ApiOrderOrderIdGetPathParams["id"],
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiOrderOrderIdGetQueryKey(id)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/order/order/${id}`,

            ...options,
         })
      },
   }
}

/**
 * @link /api/order/order/:id
 */

export function useApiOrderOrderIdGetHook<
   TData = ApiOrderOrderIdGetQueryResponse,
   TError = unknown,
>(
   id: ApiOrderOrderIdGetPathParams["id"],
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey = queryOptions?.queryKey ?? apiOrderOrderIdGetQueryKey(id)

   const query = useQuery<TData, TError>({
      ...apiOrderOrderIdGetQueryOptions<TData, TError>(id, clientOptions),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
