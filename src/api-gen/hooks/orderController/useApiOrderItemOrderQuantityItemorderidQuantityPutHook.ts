import type {
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import client from "../../../client"
import type { ResponseConfig } from "../../../client"
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
      mutation?: UseMutationOptions<ResponseConfig<TData>, TError, void>
      client?: Partial<Parameters<typeof client<TData, TError, void>>[0]>
   } = {},
): UseMutationResult<ResponseConfig<TData>, TError, void> {
   const { mutation: mutationOptions, client: clientOptions = {} } =
      options ?? {}

   return useMutation<ResponseConfig<TData>, TError, void>({
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
