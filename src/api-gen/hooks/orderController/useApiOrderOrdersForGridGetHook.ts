import type {
   QueryKey,
   UseQueryResult,
   UseQueryOptions,
   QueryOptions,
} from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import client from "../../../client"
import type {
   ApiOrderOrdersForGridGetQueryResponse,
   ApiOrderOrdersForGridGetQueryParams,
} from "../../models/orderController/ApiOrderOrdersForGridGet"

export const apiOrderOrdersForGridGetQueryKey = (
   params?: ApiOrderOrdersForGridGetQueryParams,
) => [`/api/order/orders-for-grid`, ...(params ? [params] : [])] as const

export function apiOrderOrdersForGridGetQueryOptions<
   TData = ApiOrderOrdersForGridGetQueryResponse,
   TError = unknown,
>(
   params?: ApiOrderOrdersForGridGetQueryParams,
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiOrderOrdersForGridGetQueryKey(params)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/order/orders-for-grid`,
            params,

            ...options,
         }).then((res) => res.data)
      },
   }
}

/**
 * @link /api/order/orders-for-grid
 */

export function useApiOrderOrdersForGridGetHook<
   TData = ApiOrderOrdersForGridGetQueryResponse,
   TError = unknown,
>(
   params?: ApiOrderOrdersForGridGetQueryParams,
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey =
      queryOptions?.queryKey ?? apiOrderOrdersForGridGetQueryKey(params)

   const query = useQuery<TData, TError>({
      ...apiOrderOrdersForGridGetQueryOptions<TData, TError>(
         params,
         clientOptions,
      ),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
