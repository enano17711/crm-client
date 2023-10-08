import type {
   QueryKey,
   UseQueryResult,
   UseQueryOptions,
   QueryOptions,
} from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import client from "../../../client"
import type {
   ApiSaleSaleIdGetQueryResponse,
   ApiSaleSaleIdGetPathParams,
} from "../../models/saleController/ApiSaleSaleIdGet"

export const apiSaleSaleIdGetQueryKey = (
   id: ApiSaleSaleIdGetPathParams["id"],
) => [`/api/sale/sale/${id}`] as const

export function apiSaleSaleIdGetQueryOptions<
   TData = ApiSaleSaleIdGetQueryResponse,
   TError = unknown,
>(
   id: ApiSaleSaleIdGetPathParams["id"],
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiSaleSaleIdGetQueryKey(id)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/sale/sale/${id}`,

            ...options,
         }).then((res) => res.data)
      },
   }
}

/**
 * @link /api/sale/sale/:id
 */

export function useApiSaleSaleIdGetHook<
   TData = ApiSaleSaleIdGetQueryResponse,
   TError = unknown,
>(
   id: ApiSaleSaleIdGetPathParams["id"],
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey = queryOptions?.queryKey ?? apiSaleSaleIdGetQueryKey(id)

   const query = useQuery<TData, TError>({
      ...apiSaleSaleIdGetQueryOptions<TData, TError>(id, clientOptions),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
