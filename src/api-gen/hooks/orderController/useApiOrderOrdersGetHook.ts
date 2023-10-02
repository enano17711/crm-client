import {
   QueryKey,
   useQuery,
   UseQueryOptions,
   UseQueryResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiOrderOrdersGetQueryParams,
   ApiOrderOrdersGetQueryResponse,
} from "../../models/orderController/ApiOrderOrdersGet"

export const apiOrderOrdersGetQueryKey = (
   params?: ApiOrderOrdersGetQueryParams,
) => [`/api/order/orders`, ...(params ? [params] : [])] as const

export function apiOrderOrdersGetQueryOptions<
   TData = ApiOrderOrdersGetQueryResponse,
   TError = unknown,
>(
   params?: ApiOrderOrdersGetQueryParams,
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiOrderOrdersGetQueryKey(params)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/order/orders`,
            params,

            ...options,
         })
      },
   }
}

/**
 * @link /api/order/orders
 */

export function useApiOrderOrdersGetHook<
   TData = ApiOrderOrdersGetQueryResponse,
   TError = unknown,
>(
   params?: ApiOrderOrdersGetQueryParams,
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey = queryOptions?.queryKey ?? apiOrderOrdersGetQueryKey(params)

   const query = useQuery<TData, TError>({
      ...apiOrderOrdersGetQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
