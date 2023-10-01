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
import type { ApiRbacUsersGetQueryResponse } from "../../models/rbacController/ApiRbacUsersGet"

export const apiRbacUsersGetQueryKey = () => [`/api/rbac/users`] as const

export function apiRbacUsersGetQueryOptions<
   TData = ApiRbacUsersGetQueryResponse,
   TError = unknown,
>(
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiRbacUsersGetQueryKey()

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/rbac/users`,

            ...options,
         })
      },
   }
}

/**
 * @link /api/rbac/users
 */

export function useApiRbacUsersGetHook<
   TData = ApiRbacUsersGetQueryResponse,
   TError = unknown,
>(
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey = queryOptions?.queryKey ?? apiRbacUsersGetQueryKey()

   const query = useQuery<TData, TError>({
      ...apiRbacUsersGetQueryOptions<TData, TError>(clientOptions),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
