import type {
   QueryKey,
   UseQueryResult,
   UseQueryOptions,
   QueryOptions,
} from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import client from "../../../client"
import type {
   ApiAdjustmentsAdjustmentIdGetQueryResponse,
   ApiAdjustmentsAdjustmentIdGetPathParams,
} from "../../models/adjustmentsController/ApiAdjustmentsAdjustmentIdGet"

export const apiAdjustmentsAdjustmentIdGetQueryKey = (
   id: ApiAdjustmentsAdjustmentIdGetPathParams["id"],
) => [`/api/adjustments/adjustment/${id}`] as const

export function apiAdjustmentsAdjustmentIdGetQueryOptions<
   TData = ApiAdjustmentsAdjustmentIdGetQueryResponse,
   TError = unknown,
>(
   id: ApiAdjustmentsAdjustmentIdGetPathParams["id"],
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiAdjustmentsAdjustmentIdGetQueryKey(id)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/adjustments/adjustment/${id}`,

            ...options,
         }).then((res) => res.data)
      },
   }
}

/**
 * @link /api/adjustments/adjustment/:id
 */

export function useApiAdjustmentsAdjustmentIdGetHook<
   TData = ApiAdjustmentsAdjustmentIdGetQueryResponse,
   TError = unknown,
>(
   id: ApiAdjustmentsAdjustmentIdGetPathParams["id"],
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey =
      queryOptions?.queryKey ?? apiAdjustmentsAdjustmentIdGetQueryKey(id)

   const query = useQuery<TData, TError>({
      ...apiAdjustmentsAdjustmentIdGetQueryOptions<TData, TError>(
         id,
         clientOptions,
      ),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
