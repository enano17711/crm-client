import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client"
import type {
   ApiBrandBrandPostMutationRequest,
   ApiBrandBrandPostMutationResponse,
} from "../../models/brandController/ApiBrandBrandPost"

/**
 * @link /api/brand/brand
 */

export function useApiBrandBrandPostHook<
   TData = ApiBrandBrandPostMutationResponse,
   TError = unknown,
   TVariables = ApiBrandBrandPostMutationRequest,
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
            url: `/api/brand/brand`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
