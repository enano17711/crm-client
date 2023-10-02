import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiTaxTaxIdDeleteMutationResponse,
   ApiTaxTaxIdDeletePathParams,
} from "../../models/taxController/ApiTaxTaxIdDelete"

/**
 * @link /api/tax/tax/:id
 */

export function useApiTaxTaxIdDeleteHook<
   TData = ApiTaxTaxIdDeleteMutationResponse,
   TError = unknown,
>(
   id: ApiTaxTaxIdDeletePathParams["id"],
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
            url: `/api/tax/tax/${id}`,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
