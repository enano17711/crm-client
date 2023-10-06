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
   ApiCategoryItemCategoryItemsForGridGetQueryResponse,
   ApiCategoryItemCategoryItemsForGridGetQueryParams,
} from "../../models/categoryItemController/ApiCategoryItemCategoryItemsForGridGet"

export const apiCategoryItemCategoryItemsForGridGetQueryKey = (
   params?: ApiCategoryItemCategoryItemsForGridGetQueryParams,
) =>
   [
      `/api/category-item/category-items-for-grid`,
      ...(params ? [params] : []),
   ] as const

export function apiCategoryItemCategoryItemsForGridGetQueryOptions<
   TData = ApiCategoryItemCategoryItemsForGridGetQueryResponse,
   TError = unknown,
>(
   params?: ApiCategoryItemCategoryItemsForGridGetQueryParams,
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiCategoryItemCategoryItemsForGridGetQueryKey(params)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/category-item/category-items-for-grid`,
            params,

            ...options,
         })
      },
   }
}

/**
 * @link /api/category-item/category-items-for-grid
 */

export function useApiCategoryItemCategoryItemsForGridGetHook<
   TData = ApiCategoryItemCategoryItemsForGridGetQueryResponse,
   TError = unknown,
>(
   params?: ApiCategoryItemCategoryItemsForGridGetQueryParams,
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey =
      queryOptions?.queryKey ??
      apiCategoryItemCategoryItemsForGridGetQueryKey(params)

   const query = useQuery<TData, TError>({
      ...apiCategoryItemCategoryItemsForGridGetQueryOptions<TData, TError>(
         params,
         clientOptions,
      ),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
