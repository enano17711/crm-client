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
   ApiSupplierSuppliersForGridGetQueryResponse,
   ApiSupplierSuppliersForGridGetQueryParams,
} from "../../models/supplierController/ApiSupplierSuppliersForGridGet"

export const apiSupplierSuppliersForGridGetQueryKey = (
   params?: ApiSupplierSuppliersForGridGetQueryParams,
) => [`/api/supplier/suppliers-for-grid`, ...(params ? [params] : [])] as const

export function apiSupplierSuppliersForGridGetQueryOptions<
   TData = ApiSupplierSuppliersForGridGetQueryResponse,
   TError = unknown,
>(
   params?: ApiSupplierSuppliersForGridGetQueryParams,
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiSupplierSuppliersForGridGetQueryKey(params)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/supplier/suppliers-for-grid`,
            params,

            ...options,
         })
      },
   }
}

/**
 * @link /api/supplier/suppliers-for-grid
 */

export function useApiSupplierSuppliersForGridGetHook<
   TData = ApiSupplierSuppliersForGridGetQueryResponse,
   TError = unknown,
>(
   params?: ApiSupplierSuppliersForGridGetQueryParams,
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey =
      queryOptions?.queryKey ?? apiSupplierSuppliersForGridGetQueryKey(params)

   const query = useQuery<TData, TError>({
      ...apiSupplierSuppliersForGridGetQueryOptions<TData, TError>(
         params,
         clientOptions,
      ),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
