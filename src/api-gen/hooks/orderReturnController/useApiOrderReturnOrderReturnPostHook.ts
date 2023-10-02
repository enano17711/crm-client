import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiOrderReturnOrderReturnPostMutationRequest,
   ApiOrderReturnOrderReturnPostMutationResponse,
} from "../../models/orderReturnController/ApiOrderReturnOrderReturnPost"

/**
 * @link /api/order-return/order-return
 */

export function useApiOrderReturnOrderReturnPostHook<
   TData = ApiOrderReturnOrderReturnPostMutationResponse,
   TError = unknown,
   TVariables = ApiOrderReturnOrderReturnPostMutationRequest,
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
            url: `/api/order-return/order-return`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
