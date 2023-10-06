import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client"
import type {
   ApiRbacUserPostMutationRequest,
   ApiRbacUserPostMutationResponse,
} from "../../models/rbacController/ApiRbacUserPost"

/**
 * @link /api/rbac/user
 */

export function useApiRbacUserPostHook<
   TData = ApiRbacUserPostMutationResponse,
   TError = unknown,
   TVariables = ApiRbacUserPostMutationRequest,
>(
   options: {
      mutation?: UseMutationOptions<TData, TError, TVariables>
      client?: Partial<Parameters<typeof client<TData, TError, TVariables>>[0]>
   } = {},
): UseMutationResult<TData, TError, TVariables> {
   const { mutation: mutationOptions, client: clientOptions = {} } =
      options ?? {}

   return useMutation<TData, TError, TVariables>({
      mutationFn: (data) => {
         return client<TData, TError, TVariables>({
            method: "post",
            url: `/api/rbac/user`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
