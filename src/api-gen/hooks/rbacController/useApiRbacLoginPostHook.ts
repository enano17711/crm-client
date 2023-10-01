import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client"
import type {
   ApiRbacLoginPostMutationRequest,
   ApiRbacLoginPostMutationResponse,
} from "../../models/rbacController/ApiRbacLoginPost"

/**
 * @link /api/rbac/login
 */

export function useApiRbacLoginPostHook<
   TData = ApiRbacLoginPostMutationResponse,
   TError = unknown,
   TVariables = ApiRbacLoginPostMutationRequest,
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
            url: `/api/rbac/login`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
