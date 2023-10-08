import type {
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import client from "../../../client"
import type { ResponseConfig } from "../../../client"
import type {
   ApiBrandBrandIdDeleteMutationResponse,
   ApiBrandBrandIdDeletePathParams,
} from "../../models/brandController/ApiBrandBrandIdDelete"

/**
 * @summary Deletes a brand.
 * @link /api/brand/brand/:id
 */

export function useApiBrandBrandIdDeleteHook<
   TData = ApiBrandBrandIdDeleteMutationResponse,
   TError = unknown,
>(
   id: ApiBrandBrandIdDeletePathParams["id"],
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
            method: "delete",
            url: `/api/brand/brand/${id}`,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
