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
   ApiTaxTaxsForGridGetQueryResponse,
   ApiTaxTaxsForGridGetQueryParams,
} from "../../models/taxController/ApiTaxTaxsForGridGet"

export const apiTaxTaxsForGridGetQueryKey = (
   params?: ApiTaxTaxsForGridGetQueryParams,
) => [`/api/tax/taxs-for-grid`, ...(params ? [params] : [])] as const

export function apiTaxTaxsForGridGetQueryOptions<
   TData = ApiTaxTaxsForGridGetQueryResponse,
   TError = unknown,
>(
   params?: ApiTaxTaxsForGridGetQueryParams,
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiTaxTaxsForGridGetQueryKey(params)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/tax/taxs-for-grid`,
            params,

            ...options,
         })
      },
   }
}

/**
 * @link /api/tax/taxs-for-grid
 */

export function useApiTaxTaxsForGridGetHook<
   TData = ApiTaxTaxsForGridGetQueryResponse,
   TError = unknown,
>(
   params?: ApiTaxTaxsForGridGetQueryParams,
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey =
      queryOptions?.queryKey ?? apiTaxTaxsForGridGetQueryKey(params)

   const query = useQuery<TData, TError>({
      ...apiTaxTaxsForGridGetQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
