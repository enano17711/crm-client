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
   ApiCategoryItemCategoryItemsGetQueryResponse,
   ApiCategoryItemCategoryItemsGetQueryParams,
} from "../../models/categoryItemController/ApiCategoryItemCategoryItemsGet"

export const apiCategoryItemCategoryItemsGetQueryKey = (
   params?: ApiCategoryItemCategoryItemsGetQueryParams,
) => [`/api/category-item/category-items`, ...(params ? [params] : [])] as const

export function apiCategoryItemCategoryItemsGetQueryOptions<
   TData = ApiCategoryItemCategoryItemsGetQueryResponse,
   TError = unknown,
>(
   params?: ApiCategoryItemCategoryItemsGetQueryParams,
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiCategoryItemCategoryItemsGetQueryKey(params)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/category-item/category-items`,
            params,

            ...options,
         })
      },
   }
}

/**
 * @link /api/category-item/category-items
 */

export function useApiCategoryItemCategoryItemsGetHook<
   TData = ApiCategoryItemCategoryItemsGetQueryResponse,
   TError = unknown,
>(
   params?: ApiCategoryItemCategoryItemsGetQueryParams,
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey =
      queryOptions?.queryKey ?? apiCategoryItemCategoryItemsGetQueryKey(params)

   const query = useQuery<TData, TError>({
      ...apiCategoryItemCategoryItemsGetQueryOptions<TData, TError>(
         params,
         clientOptions,
      ),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
