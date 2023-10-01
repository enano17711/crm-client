import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client"
import type {
   ApiRbacUserIdDeleteMutationResponse,
   ApiRbacUserIdDeletePathParams,
} from "../../models/rbacController/ApiRbacUserIdDelete"

/**
 * @link /api/rbac/user/:id
 */

export function useApiRbacUserIdDeleteHook<
   TData = ApiRbacUserIdDeleteMutationResponse,
   TError = unknown,
>(
   id: ApiRbacUserIdDeletePathParams["id"],
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
            method: "delete",
            url: `/api/rbac/user/${id}`,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
