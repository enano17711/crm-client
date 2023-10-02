import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiOrderItemOrderQuantityItemorderidQuantityPutMutationResponse,
   ApiOrderItemOrderQuantityItemorderidQuantityPutPathParams,
} from "../../models/orderController/ApiOrderItemOrderQuantityItemorderidQuantityPut"

/**
 * @link /api/order/item-order-quantity/:itemorderid/:quantity
 */

export function useApiOrderItemOrderQuantityItemorderidQuantityPutHook<
   TData = ApiOrderItemOrderQuantityItemorderidQuantityPutMutationResponse,
   TError = unknown,
>(
   itemorderid: ApiOrderItemOrderQuantityItemorderidQuantityPutPathParams["itemorderid"],
   quantity: ApiOrderItemOrderQuantityItemorderidQuantityPutPathParams["quantity"],
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
            url: `/api/order/item-order-quantity/${itemorderid}/${quantity}`,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
