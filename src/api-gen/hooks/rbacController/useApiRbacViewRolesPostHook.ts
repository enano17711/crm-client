import type {
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import client from "../../../client"
import type { ResponseConfig } from "../../../client"
import type { ApiRbacViewRolesPostMutationResponse } from "../../models/rbacController/ApiRbacViewRolesPost"

/**
 * @link /api/rbac/view-roles
 */

export function useApiRbacViewRolesPostHook<
   TData = ApiRbacViewRolesPostMutationResponse,
   TError = unknown,
>(
   options: {
      mutation?: UseMutationOptions<ResponseConfig<TData>, TError, void>
      client?: Partial<Parameters<typeof client<TData, TError, void>>[0]>
   } = {},
): UseMutationResult<ResponseConfig<TData>, TError, void> {
   const { mutation: mutationOptions, client: clientOptions = {} } =
      options ?? {}

   return useMutation<ResponseConfig<TData>, TError, void>({
      mutationFn: () => {
         return client<TData, TError, void>({
            method: "post",
            url: `/api/rbac/view-roles`,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
