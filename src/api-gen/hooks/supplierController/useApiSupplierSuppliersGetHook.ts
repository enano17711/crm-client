import {
   QueryKey,
   useQuery,
   UseQueryOptions,
   UseQueryResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiSupplierSuppliersGetQueryParams,
   ApiSupplierSuppliersGetQueryResponse,
} from "../../models/supplierController/ApiSupplierSuppliersGet"

export const apiSupplierSuppliersGetQueryKey = (
   params?: ApiSupplierSuppliersGetQueryParams,
) => [`/api/supplier/suppliers`, ...(params ? [params] : [])] as const

export function apiSupplierSuppliersGetQueryOptions<
   TData = ApiSupplierSuppliersGetQueryResponse,
   TError = unknown,
>(
   params?: ApiSupplierSuppliersGetQueryParams,
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiSupplierSuppliersGetQueryKey(params)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/supplier/suppliers`,
            params,

            ...options,
         })
      },
   }
}

/**
 * @link /api/supplier/suppliers
 */

export function useApiSupplierSuppliersGetHook<
   TData = ApiSupplierSuppliersGetQueryResponse,
   TError = unknown,
>(
   params?: ApiSupplierSuppliersGetQueryParams,
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey =
      queryOptions?.queryKey ?? apiSupplierSuppliersGetQueryKey(params)

   const query = useQuery<TData, TError>({
      ...apiSupplierSuppliersGetQueryOptions<TData, TError>(
         params,
         clientOptions,
      ),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
