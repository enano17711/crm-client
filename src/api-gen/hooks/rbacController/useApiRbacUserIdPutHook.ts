import type {
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import client from "../../../client"
import type { ResponseConfig } from "../../../client"
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
      mutation?: UseMutationOptions<ResponseConfig<TData>, TError, TVariables>
      client?: Partial<Parameters<typeof client<TData, TError, TVariables>>[0]>
   } = {},
): UseMutationResult<ResponseConfig<TData>, TError, TVariables> {
   const { mutation: mutationOptions, client: clientOptions = {} } =
      options ?? {}

   return useMutation<ResponseConfig<TData>, TError, TVariables>({
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
