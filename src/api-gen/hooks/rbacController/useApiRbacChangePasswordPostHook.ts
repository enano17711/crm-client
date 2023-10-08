import type {
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import client from "../../../client"
import type { ResponseConfig } from "../../../client"
import type {
   ApiRbacChangePasswordPostMutationRequest,
   ApiRbacChangePasswordPostMutationResponse,
} from "../../models/rbacController/ApiRbacChangePasswordPost"

/**
 * @link /api/rbac/change-password
 */

export function useApiRbacChangePasswordPostHook<
   TData = ApiRbacChangePasswordPostMutationResponse,
   TError = unknown,
   TVariables = ApiRbacChangePasswordPostMutationRequest,
>(
   options: {
      mutation?: UseMutationOptions<ResponseConfig<TData>, TError, TVariables>
      client?: Partial<Parameters<typeof client<TData, TError, TVariables>>[0]>
   } = {},
): UseMutationResult<ResponseConfig<TData>, TError, TVariables> {
   const { mutation: mutationOptions, client: clientOptions = {} } =
      options ?? {}

   return useMutation<ResponseConfig<TData>, TError, TVariables>({
      mutationFn: (data) => {
         return client<TData, TError, TVariables>({
            method: "post",
            url: `/api/rbac/change-password`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
