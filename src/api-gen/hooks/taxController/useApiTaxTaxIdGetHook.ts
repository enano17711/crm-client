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
   ApiTaxTaxIdGetQueryResponse,
   ApiTaxTaxIdGetPathParams,
} from "../../models/taxController/ApiTaxTaxIdGet"

export const apiTaxTaxIdGetQueryKey = (id: ApiTaxTaxIdGetPathParams["id"]) =>
   [`/api/tax/tax/${id}`] as const

export function apiTaxTaxIdGetQueryOptions<
   TData = ApiTaxTaxIdGetQueryResponse,
   TError = unknown,
>(
   id: ApiTaxTaxIdGetPathParams["id"],
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiTaxTaxIdGetQueryKey(id)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/tax/tax/${id}`,

            ...options,
         })
      },
   }
}

/**
 * @link /api/tax/tax/:id
 */

export function useApiTaxTaxIdGetHook<
   TData = ApiTaxTaxIdGetQueryResponse,
   TError = unknown,
>(
   id: ApiTaxTaxIdGetPathParams["id"],
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey = queryOptions?.queryKey ?? apiTaxTaxIdGetQueryKey(id)

   const query = useQuery<TData, TError>({
      ...apiTaxTaxIdGetQueryOptions<TData, TError>(id, clientOptions),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
