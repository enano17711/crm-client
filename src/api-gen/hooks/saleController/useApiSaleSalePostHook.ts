import type {
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import client from "../../../client"
import type { ResponseConfig } from "../../../client"
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
            url: `/api/sale/sale`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
