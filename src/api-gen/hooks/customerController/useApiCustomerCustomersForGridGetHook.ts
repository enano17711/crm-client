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
   ApiCustomerCustomersForGridGetQueryResponse,
   ApiCustomerCustomersForGridGetQueryParams,
} from "../../models/customerController/ApiCustomerCustomersForGridGet"

export const apiCustomerCustomersForGridGetQueryKey = (
   params?: ApiCustomerCustomersForGridGetQueryParams,
) => [`/api/customer/customers-for-grid`, ...(params ? [params] : [])] as const

export function apiCustomerCustomersForGridGetQueryOptions<
   TData = ApiCustomerCustomersForGridGetQueryResponse,
   TError = unknown,
>(
   params?: ApiCustomerCustomersForGridGetQueryParams,
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiCustomerCustomersForGridGetQueryKey(params)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/customer/customers-for-grid`,
            params,

            ...options,
         })
      },
   }
}

/**
 * @link /api/customer/customers-for-grid
 */

export function useApiCustomerCustomersForGridGetHook<
   TData = ApiCustomerCustomersForGridGetQueryResponse,
   TError = unknown,
>(
   params?: ApiCustomerCustomersForGridGetQueryParams,
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey =
      queryOptions?.queryKey ?? apiCustomerCustomersForGridGetQueryKey(params)

   const query = useQuery<TData, TError>({
      ...apiCustomerCustomersForGridGetQueryOptions<TData, TError>(
         params,
         clientOptions,
      ),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
