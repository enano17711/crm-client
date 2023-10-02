import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiSaleSaleStatusSaleidStatusPutMutationResponse,
   ApiSaleSaleStatusSaleidStatusPutPathParams,
} from "../../models/saleController/ApiSaleSaleStatusSaleidStatusPut"

/**
 * @link /api/sale/sale-status/:saleid/:status
 */

export function useApiSaleSaleStatusSaleidStatusPutHook<
   TData = ApiSaleSaleStatusSaleidStatusPutMutationResponse,
   TError = unknown,
>(
   saleid: ApiSaleSaleStatusSaleidStatusPutPathParams["saleid"],
   status: ApiSaleSaleStatusSaleidStatusPutPathParams["status"],
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
            url: `/api/sale/sale-status/${saleid}/${status}`,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
