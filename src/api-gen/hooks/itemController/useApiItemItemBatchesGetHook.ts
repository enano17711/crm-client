import type {
   QueryKey,
   UseQueryResult,
   UseQueryOptions,
   QueryOptions,
} from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import client from "../../../client"
import type {
   ApiItemItemBatchesGetQueryResponse,
   ApiItemItemBatchesGetQueryParams,
} from "../../models/itemController/ApiItemItemBatchesGet"

export const apiItemItemBatchesGetQueryKey = (
   params?: ApiItemItemBatchesGetQueryParams,
) => [`/api/item/item-batches`, ...(params ? [params] : [])] as const

export function apiItemItemBatchesGetQueryOptions<
   TData = ApiItemItemBatchesGetQueryResponse,
   TError = unknown,
>(
   params?: ApiItemItemBatchesGetQueryParams,
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiItemItemBatchesGetQueryKey(params)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/item/item-batches`,
            params,

            ...options,
         }).then((res) => res.data)
      },
   }
}

/**
 * @link /api/item/item-batches
 */

export function useApiItemItemBatchesGetHook<
   TData = ApiItemItemBatchesGetQueryResponse,
   TError = unknown,
>(
   params?: ApiItemItemBatchesGetQueryParams,
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey =
      queryOptions?.queryKey ?? apiItemItemBatchesGetQueryKey(params)

   const query = useQuery<TData, TError>({
      ...apiItemItemBatchesGetQueryOptions<TData, TError>(
         params,
         clientOptions,
      ),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
