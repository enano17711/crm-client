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
   ApiCategoryItemCategoryItemIdGetQueryResponse,
   ApiCategoryItemCategoryItemIdGetPathParams,
} from "../../models/categoryItemController/ApiCategoryItemCategoryItemIdGet"

export const apiCategoryItemCategoryItemIdGetQueryKey = (
   id: ApiCategoryItemCategoryItemIdGetPathParams["id"],
) => [`/api/category-item/category-item/${id}`] as const

export function apiCategoryItemCategoryItemIdGetQueryOptions<
   TData = ApiCategoryItemCategoryItemIdGetQueryResponse,
   TError = unknown,
>(
   id: ApiCategoryItemCategoryItemIdGetPathParams["id"],
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiCategoryItemCategoryItemIdGetQueryKey(id)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/category-item/category-item/${id}`,

            ...options,
         })
      },
   }
}

/**
 * @link /api/category-item/category-item/:id
 */

export function useApiCategoryItemCategoryItemIdGetHook<
   TData = ApiCategoryItemCategoryItemIdGetQueryResponse,
   TError = unknown,
>(
   id: ApiCategoryItemCategoryItemIdGetPathParams["id"],
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey =
      queryOptions?.queryKey ?? apiCategoryItemCategoryItemIdGetQueryKey(id)

   const query = useQuery<TData, TError>({
      ...apiCategoryItemCategoryItemIdGetQueryOptions<TData, TError>(
         id,
         clientOptions,
      ),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
