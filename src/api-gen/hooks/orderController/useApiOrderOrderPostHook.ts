import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiOrderOrderPostMutationRequest,
   ApiOrderOrderPostMutationResponse,
} from "../../models/orderController/ApiOrderOrderPost"

/**
 * @link /api/order/order
 */

export function useApiOrderOrderPostHook<
   TData = ApiOrderOrderPostMutationResponse,
   TError = unknown,
   TVariables = ApiOrderOrderPostMutationRequest,
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
            url: `/api/order/order`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
