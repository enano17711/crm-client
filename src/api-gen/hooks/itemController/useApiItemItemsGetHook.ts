import {
   QueryKey,
   useQuery,
   UseQueryOptions,
   UseQueryResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiItemItemsGetQueryParams,
   ApiItemItemsGetQueryResponse,
} from "../../models/itemController/ApiItemItemsGet"

export const apiItemItemsGetQueryKey = (params?: ApiItemItemsGetQueryParams) =>
   [`/api/item/items`, ...(params ? [params] : [])] as const

export function apiItemItemsGetQueryOptions<
   TData = ApiItemItemsGetQueryResponse,
   TError = unknown,
>(
   params?: ApiItemItemsGetQueryParams,
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiItemItemsGetQueryKey(params)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/item/items`,
            params,

            ...options,
         })
      },
   }
}

/**
 * @link /api/item/items
 */

export function useApiItemItemsGetHook<
   TData = ApiItemItemsGetQueryResponse,
   TError = unknown,
>(
   params?: ApiItemItemsGetQueryParams,
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey = queryOptions?.queryKey ?? apiItemItemsGetQueryKey(params)

   const query = useQuery<TData, TError>({
      ...apiItemItemsGetQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
