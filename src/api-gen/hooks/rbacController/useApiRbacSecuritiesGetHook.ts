import type {
   QueryKey,
   UseQueryResult,
   UseQueryOptions,
   QueryOptions,
} from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import client from "../../../client"
import type { ApiRbacSecuritiesGetQueryResponse } from "../../models/rbacController/ApiRbacSecuritiesGet"

export const apiRbacSecuritiesGetQueryKey = () =>
   [`/api/rbac/securities`] as const

export function apiRbacSecuritiesGetQueryOptions<
   TData = ApiRbacSecuritiesGetQueryResponse,
   TError = unknown,
>(
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiRbacSecuritiesGetQueryKey()

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/rbac/securities`,

            ...options,
         }).then((res) => res.data)
      },
   }
}

/**
 * @link /api/rbac/securities
 */

export function useApiRbacSecuritiesGetHook<
   TData = ApiRbacSecuritiesGetQueryResponse,
   TError = unknown,
>(
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey = queryOptions?.queryKey ?? apiRbacSecuritiesGetQueryKey()

   const query = useQuery<TData, TError>({
      ...apiRbacSecuritiesGetQueryOptions<TData, TError>(clientOptions),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
