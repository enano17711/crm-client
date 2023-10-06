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
   ApiSaleSalesForGridGetQueryResponse,
   ApiSaleSalesForGridGetQueryParams,
} from "../../models/saleController/ApiSaleSalesForGridGet"

export const apiSaleSalesForGridGetQueryKey = (
   params?: ApiSaleSalesForGridGetQueryParams,
) => [`/api/sale/sales-for-grid`, ...(params ? [params] : [])] as const

export function apiSaleSalesForGridGetQueryOptions<
   TData = ApiSaleSalesForGridGetQueryResponse,
   TError = unknown,
>(
   params?: ApiSaleSalesForGridGetQueryParams,
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiSaleSalesForGridGetQueryKey(params)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/sale/sales-for-grid`,
            params,

            ...options,
         })
      },
   }
}

/**
 * @link /api/sale/sales-for-grid
 */

export function useApiSaleSalesForGridGetHook<
   TData = ApiSaleSalesForGridGetQueryResponse,
   TError = unknown,
>(
   params?: ApiSaleSalesForGridGetQueryParams,
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey =
      queryOptions?.queryKey ?? apiSaleSalesForGridGetQueryKey(params)

   const query = useQuery<TData, TError>({
      ...apiSaleSalesForGridGetQueryOptions<TData, TError>(
         params,
         clientOptions,
      ),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
