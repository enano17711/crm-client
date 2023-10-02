import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiTaxTaxIdPutMutationRequest,
   ApiTaxTaxIdPutMutationResponse,
   ApiTaxTaxIdPutPathParams,
} from "../../models/taxController/ApiTaxTaxIdPut"

/**
 * @link /api/tax/tax/:id
 */

export function useApiTaxTaxIdPutHook<
   TData = ApiTaxTaxIdPutMutationResponse,
   TError = unknown,
   TVariables = ApiTaxTaxIdPutMutationRequest,
>(
   id: ApiTaxTaxIdPutPathParams["id"],
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
            url: `/api/tax/tax/${id}`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
