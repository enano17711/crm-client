import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiRbacGiveUserRolePostMutationResponse,
   ApiRbacGiveUserRolePostQueryParams,
} from "../../models/rbacController/ApiRbacGiveUserRolePost"

/**
 * @link /api/rbac/give-user-role
 */

export function useApiRbacGiveUserRolePostHook<
   TData = ApiRbacGiveUserRolePostMutationResponse,
   TError = unknown,
>(
   params?: ApiRbacGiveUserRolePostQueryParams,
   options: {
      mutation?: UseMutationOptions<TData, TError, void>
      client?: Partial<Parameters<typeof client<TData, TError, void>>[0]>
   } = {},
): UseMutationResult<TData, TError, void> {
   const { mutation: mutationOptions, client: clientOptions = {} } =
      options ?? {}

   return useMutation<TData, TError, void>({
      mutationFn: () => {
         return client<TData, TError, void>({
            method: "post",
            url: `/api/rbac/give-user-role`,

            params,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
