import {
   QueryKey,
   useQuery,
   UseQueryOptions,
   UseQueryResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiBaseUnitBaseUnitIdGetPathParams,
   ApiBaseUnitBaseUnitIdGetQueryResponse,
} from "../../models/baseUnitController/ApiBaseUnitBaseUnitIdGet"

export const apiBaseUnitBaseUnitIdGetQueryKey = (
   id: ApiBaseUnitBaseUnitIdGetPathParams["id"],
) => [`/api/base-unit/base-unit/${id}`] as const

export function apiBaseUnitBaseUnitIdGetQueryOptions<
   TData = ApiBaseUnitBaseUnitIdGetQueryResponse,
   TError = unknown,
>(
   id: ApiBaseUnitBaseUnitIdGetPathParams["id"],
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiBaseUnitBaseUnitIdGetQueryKey(id)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/base-unit/base-unit/${id}`,

            ...options,
         })
      },
   }
}

/**
 * @link /api/base-unit/base-unit/:id
 */

export function useApiBaseUnitBaseUnitIdGetHook<
   TData = ApiBaseUnitBaseUnitIdGetQueryResponse,
   TError = unknown,
>(
   id: ApiBaseUnitBaseUnitIdGetPathParams["id"],
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey =
      queryOptions?.queryKey ?? apiBaseUnitBaseUnitIdGetQueryKey(id)

   const query = useQuery<TData, TError>({
      ...apiBaseUnitBaseUnitIdGetQueryOptions<TData, TError>(id, clientOptions),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
