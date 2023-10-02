import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiRbacGiveRoleSecurityRoleidPostMutationResponse,
   ApiRbacGiveRoleSecurityRoleidPostPathParams,
   ApiRbacGiveRoleSecurityRoleidPostQueryParams,
} from "../../models/rbacController/ApiRbacGiveRoleSecurityRoleidPost"

/**
 * @link /api/rbac/give-role-security/:roleid
 */

export function useApiRbacGiveRoleSecurityRoleidPostHook<
   TData = ApiRbacGiveRoleSecurityRoleidPostMutationResponse,
   TError = unknown,
>(
   roleid: ApiRbacGiveRoleSecurityRoleidPostPathParams["roleid"],
   params?: ApiRbacGiveRoleSecurityRoleidPostQueryParams,
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
            url: `/api/rbac/give-role-security/${roleid}`,

            params,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
