import type {
   QueryKey,
   UseQueryResult,
   UseQueryOptions,
   QueryOptions,
} from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import client from "../../../client"
import type {
   ApiOrderReturnOrderReturnsGetQueryResponse,
   ApiOrderReturnOrderReturnsGetQueryParams,
} from "../../models/orderReturnController/ApiOrderReturnOrderReturnsGet"

export const apiOrderReturnOrderReturnsGetQueryKey = (
   params?: ApiOrderReturnOrderReturnsGetQueryParams,
) => [`/api/order-return/order-returns`, ...(params ? [params] : [])] as const

export function apiOrderReturnOrderReturnsGetQueryOptions<
   TData = ApiOrderReturnOrderReturnsGetQueryResponse,
   TError = unknown,
>(
   params?: ApiOrderReturnOrderReturnsGetQueryParams,
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiOrderReturnOrderReturnsGetQueryKey(params)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/order-return/order-returns`,
            params,

            ...options,
         }).then((res) => res.data)
      },
   }
}

/**
 * @link /api/order-return/order-returns
 */

export function useApiOrderReturnOrderReturnsGetHook<
   TData = ApiOrderReturnOrderReturnsGetQueryResponse,
   TError = unknown,
>(
   params?: ApiOrderReturnOrderReturnsGetQueryParams,
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey =
      queryOptions?.queryKey ?? apiOrderReturnOrderReturnsGetQueryKey(params)

   const query = useQuery<TData, TError>({
      ...apiOrderReturnOrderReturnsGetQueryOptions<TData, TError>(
         params,
         clientOptions,
      ),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
