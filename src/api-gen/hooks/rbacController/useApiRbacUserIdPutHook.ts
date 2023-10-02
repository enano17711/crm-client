import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiRbacUserIdPutMutationRequest,
   ApiRbacUserIdPutMutationResponse,
   ApiRbacUserIdPutPathParams,
} from "../../models/rbacController/ApiRbacUserIdPut"

/**
 * @link /api/rbac/user/:id
 */

export function useApiRbacUserIdPutHook<
   TData = ApiRbacUserIdPutMutationResponse,
   TError = unknown,
   TVariables = ApiRbacUserIdPutMutationRequest,
>(
   id: ApiRbacUserIdPutPathParams["id"],
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
            method: "put",
            url: `/api/rbac/user/${id}`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
