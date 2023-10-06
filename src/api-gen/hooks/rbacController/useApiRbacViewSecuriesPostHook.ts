import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client"
import type { ApiRbacViewSecuriesPostMutationResponse } from "../../models/rbacController/ApiRbacViewSecuriesPost"

/**
 * @link /api/rbac/view-securies
 */

export function useApiRbacViewSecuriesPostHook<
   TData = ApiRbacViewSecuriesPostMutationResponse,
   TError = unknown,
>(
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
            url: `/api/rbac/view-securies`,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
