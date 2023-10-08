import type {
   QueryKey,
   UseQueryResult,
   UseQueryOptions,
   QueryOptions,
} from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import client from "../../../client"
import type {
   ApiTaxTaxsGetQueryResponse,
   ApiTaxTaxsGetQueryParams,
} from "../../models/taxController/ApiTaxTaxsGet"

export const apiTaxTaxsGetQueryKey = (params?: ApiTaxTaxsGetQueryParams) =>
   [`/api/tax/taxs`, ...(params ? [params] : [])] as const

export function apiTaxTaxsGetQueryOptions<
   TData = ApiTaxTaxsGetQueryResponse,
   TError = unknown,
>(
   params?: ApiTaxTaxsGetQueryParams,
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiTaxTaxsGetQueryKey(params)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/tax/taxs`,
            params,

            ...options,
         }).then((res) => res.data)
      },
   }
}

/**
 * @link /api/tax/taxs
 */

export function useApiTaxTaxsGetHook<
   TData = ApiTaxTaxsGetQueryResponse,
   TError = unknown,
>(
   params?: ApiTaxTaxsGetQueryParams,
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey = queryOptions?.queryKey ?? apiTaxTaxsGetQueryKey(params)

   const query = useQuery<TData, TError>({
      ...apiTaxTaxsGetQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
