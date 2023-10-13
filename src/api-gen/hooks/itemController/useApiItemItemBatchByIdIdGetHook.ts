import type {
   QueryKey,
   UseQueryResult,
   UseQueryOptions,
   QueryOptions,
} from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import client from "../../../client"
import type {
   ApiItemItemBatchByIdIdGetQueryResponse,
   ApiItemItemBatchByIdIdGetPathParams,
} from "../../models/itemController/ApiItemItemBatchByIdIdGet"

export const apiItemItemBatchByIdIdGetQueryKey = (
   id: ApiItemItemBatchByIdIdGetPathParams["id"],
) => [`/api/item/item-batch-by-id/${id}`] as const

export function apiItemItemBatchByIdIdGetQueryOptions<
   TData = ApiItemItemBatchByIdIdGetQueryResponse,
   TError = unknown,
>(
   id: ApiItemItemBatchByIdIdGetPathParams["id"],
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiItemItemBatchByIdIdGetQueryKey(id)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/item/item-batch-by-id/${id}`,

            ...options,
         }).then((res) => res.data)
      },
   }
}

/**
 * @link /api/item/item-batch-by-id/:id
 */

export function useApiItemItemBatchByIdIdGetHook<
   TData = ApiItemItemBatchByIdIdGetQueryResponse,
   TError = unknown,
>(
   id: ApiItemItemBatchByIdIdGetPathParams["id"],
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey =
      queryOptions?.queryKey ?? apiItemItemBatchByIdIdGetQueryKey(id)

   const query = useQuery<TData, TError>({
      ...apiItemItemBatchByIdIdGetQueryOptions<TData, TError>(
         id,
         clientOptions,
      ),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
