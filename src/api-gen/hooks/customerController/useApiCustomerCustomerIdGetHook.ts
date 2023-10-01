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
   ApiCustomerCustomerIdGetQueryResponse,
   ApiCustomerCustomerIdGetPathParams,
} from "../../models/customerController/ApiCustomerCustomerIdGet"

export const apiCustomerCustomerIdGetQueryKey = (
   id: ApiCustomerCustomerIdGetPathParams["id"],
) => [`/api/customer/customer/${id}`] as const

export function apiCustomerCustomerIdGetQueryOptions<
   TData = ApiCustomerCustomerIdGetQueryResponse,
   TError = unknown,
>(
   id: ApiCustomerCustomerIdGetPathParams["id"],
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiCustomerCustomerIdGetQueryKey(id)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/customer/customer/${id}`,

            ...options,
         })
      },
   }
}

/**
 * @link /api/customer/customer/:id
 */

export function useApiCustomerCustomerIdGetHook<
   TData = ApiCustomerCustomerIdGetQueryResponse,
   TError = unknown,
>(
   id: ApiCustomerCustomerIdGetPathParams["id"],
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey =
      queryOptions?.queryKey ?? apiCustomerCustomerIdGetQueryKey(id)

   const query = useQuery<TData, TError>({
      ...apiCustomerCustomerIdGetQueryOptions<TData, TError>(id, clientOptions),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
