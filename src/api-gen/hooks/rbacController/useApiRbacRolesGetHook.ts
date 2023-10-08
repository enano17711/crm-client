import type {
   QueryKey,
   UseQueryResult,
   UseQueryOptions,
   QueryOptions,
} from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import client from "../../../client"
import type { ApiRbacRolesGetQueryResponse } from "../../models/rbacController/ApiRbacRolesGet"

export const apiRbacRolesGetQueryKey = () => [`/api/rbac/roles`] as const

export function apiRbacRolesGetQueryOptions<
   TData = ApiRbacRolesGetQueryResponse,
   TError = unknown,
>(
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiRbacRolesGetQueryKey()

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/rbac/roles`,

            ...options,
         }).then((res) => res.data)
      },
   }
}

/**
 * @link /api/rbac/roles
 */

export function useApiRbacRolesGetHook<
   TData = ApiRbacRolesGetQueryResponse,
   TError = unknown,
>(
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey = queryOptions?.queryKey ?? apiRbacRolesGetQueryKey()

   const query = useQuery<TData, TError>({
      ...apiRbacRolesGetQueryOptions<TData, TError>(clientOptions),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
