import type {
   QueryKey,
   UseQueryResult,
   UseQueryOptions,
   QueryOptions,
} from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import client from "../../../client"
import type {
   ApiUnitUnitIdGetQueryResponse,
   ApiUnitUnitIdGetPathParams,
} from "../../models/unitController/ApiUnitUnitIdGet"

export const apiUnitUnitIdGetQueryKey = (
   id: ApiUnitUnitIdGetPathParams["id"],
) => [`/api/unit/unit/${id}`] as const

export function apiUnitUnitIdGetQueryOptions<
   TData = ApiUnitUnitIdGetQueryResponse,
   TError = unknown,
>(
   id: ApiUnitUnitIdGetPathParams["id"],
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiUnitUnitIdGetQueryKey(id)

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/unit/unit/${id}`,

            ...options,
         }).then((res) => res.data)
      },
   }
}

/**
 * @summary Retrieves a unit with the specified ID.
 * @link /api/unit/unit/:id
 */

export function useApiUnitUnitIdGetHook<
   TData = ApiUnitUnitIdGetQueryResponse,
   TError = unknown,
>(
   id: ApiUnitUnitIdGetPathParams["id"],
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey = queryOptions?.queryKey ?? apiUnitUnitIdGetQueryKey(id)

   const query = useQuery<TData, TError>({
      ...apiUnitUnitIdGetQueryOptions<TData, TError>(id, clientOptions),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
