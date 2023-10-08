import type {
   QueryKey,
   UseQueryResult,
   UseQueryOptions,
   QueryOptions,
} from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import client from "../../../client"
import type {
   ApiSaleSalesGetQueryResponse,
   ApiSaleSalesGetQueryParams,
} from "../../models/saleController/ApiSaleSalesGet"

export const apiSaleSalesGetQueryKey = (params?: ApiSaleSalesGetQueryParams) =>
   [`/api/sale/sales`, ...(params ? [params] : [])] as const

export function apiSaleSalesGetQueryOptions<
   TData = ApiSaleSalesGetQueryResponse,
   TError = unknown,
>(
   params?: ApiSaleSalesGetQueryParams,
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiSaleSalesGetQueryKey(params)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/sale/sales`,
            params,

            ...options,
         }).then((res) => res.data)
      },
   }
}

/**
 * @link /api/sale/sales
 */

export function useApiSaleSalesGetHook<
   TData = ApiSaleSalesGetQueryResponse,
   TError = unknown,
>(
   params?: ApiSaleSalesGetQueryParams,
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey = queryOptions?.queryKey ?? apiSaleSalesGetQueryKey(params)

   const query = useQuery<TData, TError>({
      ...apiSaleSalesGetQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
