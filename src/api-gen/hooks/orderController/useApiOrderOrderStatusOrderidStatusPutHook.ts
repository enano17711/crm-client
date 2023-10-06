import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client"
import type {
   ApiOrderOrderStatusOrderidStatusPutMutationResponse,
   ApiOrderOrderStatusOrderidStatusPutPathParams,
} from "../../models/orderController/ApiOrderOrderStatusOrderidStatusPut"

/**
 * @link /api/order/order-status/:orderid/:status
 */

export function useApiOrderOrderStatusOrderidStatusPutHook<
   TData = ApiOrderOrderStatusOrderidStatusPutMutationResponse,
   TError = unknown,
>(
   orderid: ApiOrderOrderStatusOrderidStatusPutPathParams["orderid"],
   status: ApiOrderOrderStatusOrderidStatusPutPathParams["status"],
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
            method: "put",
            url: `/api/order/order-status/${orderid}/${status}`,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
