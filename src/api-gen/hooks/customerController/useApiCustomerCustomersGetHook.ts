import type {
   QueryKey,
   UseQueryResult,
   UseQueryOptions,
   QueryOptions,
} from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import client from "../../../client"
import type {
   ApiCustomerCustomersGetQueryResponse,
   ApiCustomerCustomersGetQueryParams,
} from "../../models/customerController/ApiCustomerCustomersGet"

export const apiCustomerCustomersGetQueryKey = (
   params?: ApiCustomerCustomersGetQueryParams,
) => [`/api/customer/customers`, ...(params ? [params] : [])] as const

export function apiCustomerCustomersGetQueryOptions<
   TData = ApiCustomerCustomersGetQueryResponse,
   TError = unknown,
>(
   params?: ApiCustomerCustomersGetQueryParams,
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiCustomerCustomersGetQueryKey(params)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/customer/customers`,
            params,

            ...options,
         }).then((res) => res.data)
      },
   }
}

/**
 * @link /api/customer/customers
 */

export function useApiCustomerCustomersGetHook<
   TData = ApiCustomerCustomersGetQueryResponse,
   TError = unknown,
>(
   params?: ApiCustomerCustomersGetQueryParams,
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey =
      queryOptions?.queryKey ?? apiCustomerCustomersGetQueryKey(params)

   const query = useQuery<TData, TError>({
      ...apiCustomerCustomersGetQueryOptions<TData, TError>(
         params,
         clientOptions,
      ),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
