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
   ApiOrderReturnOrderReturnsForGridGetQueryResponse,
   ApiOrderReturnOrderReturnsForGridGetQueryParams,
} from "../../models/orderReturnController/ApiOrderReturnOrderReturnsForGridGet"

export const apiOrderReturnOrderReturnsForGridGetQueryKey = (
   params?: ApiOrderReturnOrderReturnsForGridGetQueryParams,
) =>
   [
      `/api/order-return/order-returns-for-grid`,
      ...(params ? [params] : []),
   ] as const

export function apiOrderReturnOrderReturnsForGridGetQueryOptions<
   TData = ApiOrderReturnOrderReturnsForGridGetQueryResponse,
   TError = unknown,
>(
   params?: ApiOrderReturnOrderReturnsForGridGetQueryParams,
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiOrderReturnOrderReturnsForGridGetQueryKey(params)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/order-return/order-returns-for-grid`,
            params,

            ...options,
         })
      },
   }
}

/**
 * @link /api/order-return/order-returns-for-grid
 */

export function useApiOrderReturnOrderReturnsForGridGetHook<
   TData = ApiOrderReturnOrderReturnsForGridGetQueryResponse,
   TError = unknown,
>(
   params?: ApiOrderReturnOrderReturnsForGridGetQueryParams,
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey =
      queryOptions?.queryKey ??
      apiOrderReturnOrderReturnsForGridGetQueryKey(params)

   const query = useQuery<TData, TError>({
      ...apiOrderReturnOrderReturnsForGridGetQueryOptions<TData, TError>(
         params,
         clientOptions,
      ),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
