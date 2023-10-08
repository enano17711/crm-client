import type {
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import client from "../../../client"
import type { ResponseConfig } from "../../../client"
import type {
   ApiBrandBrandIdPutMutationRequest,
   ApiBrandBrandIdPutMutationResponse,
   ApiBrandBrandIdPutPathParams,
} from "../../models/brandController/ApiBrandBrandIdPut"

/**
 * @summary Updates an existing brand.
 * @link /api/brand/brand/:id
 */

export function useApiBrandBrandIdPutHook<
   TData = ApiBrandBrandIdPutMutationResponse,
   TError = unknown,
   TVariables = ApiBrandBrandIdPutMutationRequest,
>(
   id: ApiBrandBrandIdPutPathParams["id"],
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
            method: "put",
            url: `/api/brand/brand/${id}`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
