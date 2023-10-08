import type {
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import client from "../../../client"
import type { ResponseConfig } from "../../../client"
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
            url: `/api/order-return/order-return`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
