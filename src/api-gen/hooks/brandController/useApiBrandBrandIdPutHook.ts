import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiBrandBrandIdPutMutationRequest,
   ApiBrandBrandIdPutMutationResponse,
   ApiBrandBrandIdPutPathParams,
} from "../../models/brandController/ApiBrandBrandIdPut"

/**
 * @link /api/brand/brand/:id
 */

export function useApiBrandBrandIdPutHook<
   TData = ApiBrandBrandIdPutMutationResponse,
   TError = unknown,
   TVariables = ApiBrandBrandIdPutMutationRequest,
>(
   id: ApiBrandBrandIdPutPathParams["id"],
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
            method: "put",
            url: `/api/brand/brand/${id}`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
