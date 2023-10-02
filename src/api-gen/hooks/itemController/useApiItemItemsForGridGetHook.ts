import {
   QueryKey,
   useQuery,
   UseQueryOptions,
   UseQueryResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiItemItemsForGridGetQueryParams,
   ApiItemItemsForGridGetQueryResponse,
} from "../../models/itemController/ApiItemItemsForGridGet"

export const apiItemItemsForGridGetQueryKey = (
   params?: ApiItemItemsForGridGetQueryParams,
) => [`/api/item/items-for-grid`, ...(params ? [params] : [])] as const

export function apiItemItemsForGridGetQueryOptions<
   TData = ApiItemItemsForGridGetQueryResponse,
   TError = unknown,
>(
   params?: ApiItemItemsForGridGetQueryParams,
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiItemItemsForGridGetQueryKey(params)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/item/items-for-grid`,
            params,

            ...options,
         })
      },
   }
}

/**
 * @link /api/item/items-for-grid
 */

export function useApiItemItemsForGridGetHook<
   TData = ApiItemItemsForGridGetQueryResponse,
   TError = unknown,
>(
   params?: ApiItemItemsForGridGetQueryParams,
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey =
      queryOptions?.queryKey ?? apiItemItemsForGridGetQueryKey(params)

   const query = useQuery<TData, TError>({
      ...apiItemItemsForGridGetQueryOptions<TData, TError>(
         params,
         clientOptions,
      ),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
