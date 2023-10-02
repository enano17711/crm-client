import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiBrandBrandIdDeleteMutationResponse,
   ApiBrandBrandIdDeletePathParams,
} from "../../models/brandController/ApiBrandBrandIdDelete"

/**
 * @link /api/brand/brand/:id
 */

export function useApiBrandBrandIdDeleteHook<
   TData = ApiBrandBrandIdDeleteMutationResponse,
   TError = unknown,
>(
   id: ApiBrandBrandIdDeletePathParams["id"],
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
            method: "delete",
            url: `/api/brand/brand/${id}`,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
