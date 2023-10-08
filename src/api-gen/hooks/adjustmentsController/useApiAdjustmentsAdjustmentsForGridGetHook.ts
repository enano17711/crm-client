import type {
   QueryKey,
   UseQueryResult,
   UseQueryOptions,
   QueryOptions,
} from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import client from "../../../client"
import type {
   ApiAdjustmentsAdjustmentsForGridGetQueryResponse,
   ApiAdjustmentsAdjustmentsForGridGetQueryParams,
} from "../../models/adjustmentsController/ApiAdjustmentsAdjustmentsForGridGet"

export const apiAdjustmentsAdjustmentsForGridGetQueryKey = (
   params?: ApiAdjustmentsAdjustmentsForGridGetQueryParams,
) =>
   [
      `/api/adjustments/adjustments-for-grid`,
      ...(params ? [params] : []),
   ] as const

export function apiAdjustmentsAdjustmentsForGridGetQueryOptions<
   TData = ApiAdjustmentsAdjustmentsForGridGetQueryResponse,
   TError = unknown,
>(
   params?: ApiAdjustmentsAdjustmentsForGridGetQueryParams,
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiAdjustmentsAdjustmentsForGridGetQueryKey(params)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/adjustments/adjustments-for-grid`,
            params,

            ...options,
         }).then((res) => res.data)
      },
   }
}

/**
 * @link /api/adjustments/adjustments-for-grid
 */

export function useApiAdjustmentsAdjustmentsForGridGetHook<
   TData = ApiAdjustmentsAdjustmentsForGridGetQueryResponse,
   TError = unknown,
>(
   params?: ApiAdjustmentsAdjustmentsForGridGetQueryParams,
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey =
      queryOptions?.queryKey ??
      apiAdjustmentsAdjustmentsForGridGetQueryKey(params)

   const query = useQuery<TData, TError>({
      ...apiAdjustmentsAdjustmentsForGridGetQueryOptions<TData, TError>(
         params,
         clientOptions,
      ),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
