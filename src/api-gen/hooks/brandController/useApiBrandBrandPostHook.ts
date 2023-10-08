import type {
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import client from "../../../client"
import type { ResponseConfig } from "../../../client"
import type {
   ApiBrandBrandPostMutationRequest,
   ApiBrandBrandPostMutationResponse,
} from "../../models/brandController/ApiBrandBrandPost"

/**
 * @summary Creates a new brand.
 * @link /api/brand/brand
 */

export function useApiBrandBrandPostHook<
   TData = ApiBrandBrandPostMutationResponse,
   TError = unknown,
   TVariables = ApiBrandBrandPostMutationRequest,
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
            url: `/api/brand/brand`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
