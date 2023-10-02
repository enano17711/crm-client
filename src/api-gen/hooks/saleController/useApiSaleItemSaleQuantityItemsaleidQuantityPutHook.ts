import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiSaleItemSaleQuantityItemsaleidQuantityPutMutationResponse,
   ApiSaleItemSaleQuantityItemsaleidQuantityPutPathParams,
} from "../../models/saleController/ApiSaleItemSaleQuantityItemsaleidQuantityPut"

/**
 * @link /api/sale/item-sale-quantity/:itemsaleid/:quantity
 */

export function useApiSaleItemSaleQuantityItemsaleidQuantityPutHook<
   TData = ApiSaleItemSaleQuantityItemsaleidQuantityPutMutationResponse,
   TError = unknown,
>(
   itemsaleid: ApiSaleItemSaleQuantityItemsaleidQuantityPutPathParams["itemsaleid"],
   quantity: ApiSaleItemSaleQuantityItemsaleidQuantityPutPathParams["quantity"],
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
            url: `/api/sale/item-sale-quantity/${itemsaleid}/${quantity}`,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
