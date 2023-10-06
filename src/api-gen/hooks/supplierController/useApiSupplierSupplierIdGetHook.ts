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
   ApiSupplierSupplierIdGetQueryResponse,
   ApiSupplierSupplierIdGetPathParams,
} from "../../models/supplierController/ApiSupplierSupplierIdGet"

export const apiSupplierSupplierIdGetQueryKey = (
   id: ApiSupplierSupplierIdGetPathParams["id"],
) => [`/api/supplier/supplier/${id}`] as const

export function apiSupplierSupplierIdGetQueryOptions<
   TData = ApiSupplierSupplierIdGetQueryResponse,
   TError = unknown,
>(
   id: ApiSupplierSupplierIdGetPathParams["id"],
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiSupplierSupplierIdGetQueryKey(id)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/supplier/supplier/${id}`,

            ...options,
         })
      },
   }
}

/**
 * @link /api/supplier/supplier/:id
 */

export function useApiSupplierSupplierIdGetHook<
   TData = ApiSupplierSupplierIdGetQueryResponse,
   TError = unknown,
>(
   id: ApiSupplierSupplierIdGetPathParams["id"],
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey =
      queryOptions?.queryKey ?? apiSupplierSupplierIdGetQueryKey(id)

   const query = useQuery<TData, TError>({
      ...apiSupplierSupplierIdGetQueryOptions<TData, TError>(id, clientOptions),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
