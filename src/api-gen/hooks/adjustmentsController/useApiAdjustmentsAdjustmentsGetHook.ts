import {
   QueryKey,
   useQuery,
   UseQueryOptions,
   UseQueryResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiAdjustmentsAdjustmentsGetQueryParams,
   ApiAdjustmentsAdjustmentsGetQueryResponse,
} from "../../models/adjustmentsController/ApiAdjustmentsAdjustmentsGet"

export const apiAdjustmentsAdjustmentsGetQueryKey = (
   params?: ApiAdjustmentsAdjustmentsGetQueryParams,
) => [`/api/adjustments/adjustments`, ...(params ? [params] : [])] as const

export function apiAdjustmentsAdjustmentsGetQueryOptions<
   TData = ApiAdjustmentsAdjustmentsGetQueryResponse,
   TError = unknown,
>(
   params?: ApiAdjustmentsAdjustmentsGetQueryParams,
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiAdjustmentsAdjustmentsGetQueryKey(params)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/adjustments/adjustments`,
            params,

            ...options,
         })
      },
   }
}

/**
 * @link /api/adjustments/adjustments
 */

export function useApiAdjustmentsAdjustmentsGetHook<
   TData = ApiAdjustmentsAdjustmentsGetQueryResponse,
   TError = unknown,
>(
   params?: ApiAdjustmentsAdjustmentsGetQueryParams,
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey =
      queryOptions?.queryKey ?? apiAdjustmentsAdjustmentsGetQueryKey(params)

   const query = useQuery<TData, TError>({
      ...apiAdjustmentsAdjustmentsGetQueryOptions<TData, TError>(
         params,
         clientOptions,
      ),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
