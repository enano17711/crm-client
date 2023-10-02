import {
   QueryKey,
   useQuery,
   UseQueryOptions,
   UseQueryResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type { ApiSystemDescriptionGetQueryResponse } from "../../models/systemController/ApiSystemDescriptionGet"

export const apiSystemDescriptionGetQueryKey = () =>
   [`/api/system/description`] as const

export function apiSystemDescriptionGetQueryOptions<
   TData = ApiSystemDescriptionGetQueryResponse,
   TError = unknown,
>(
   options: Partial<Parameters<typeof client>[0]> = {},
): UseQueryOptions<TData, TError> {
   const queryKey = apiSystemDescriptionGetQueryKey()

   return {
      queryKey,
      queryFn: () => {
         return client<TData, TError>({
            method: "get",
            url: `/api/system/description`,

            ...options,
         })
      },
   }
}

/**
 * @summary 获取系统描述
 * @link /api/system/description
 */

export function useApiSystemDescriptionGetHook<
   TData = ApiSystemDescriptionGetQueryResponse,
   TError = unknown,
>(
   options: {
      query?: UseQueryOptions<TData, TError>
      client?: Partial<Parameters<typeof client<TData, TError>>[0]>
   } = {},
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
   const { query: queryOptions, client: clientOptions = {} } = options ?? {}
   const queryKey = queryOptions?.queryKey ?? apiSystemDescriptionGetQueryKey()

   const query = useQuery<TData, TError>({
      ...apiSystemDescriptionGetQueryOptions<TData, TError>(clientOptions),
      ...queryOptions,
   }) as UseQueryResult<TData, TError> & { queryKey: QueryKey }

   query.queryKey = queryKey as QueryKey

   return query
}
