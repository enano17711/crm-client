import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client"
import type {
   ApiSaleSalePostMutationRequest,
   ApiSaleSalePostMutationResponse,
} from "../../models/saleController/ApiSaleSalePost"

/**
 * @link /api/sale/sale
 */

export function useApiSaleSalePostHook<
   TData = ApiSaleSalePostMutationResponse,
   TError = unknown,
   TVariables = ApiSaleSalePostMutationRequest,
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
            url: `/api/sale/sale`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
