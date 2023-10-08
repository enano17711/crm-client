import type {
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import client from "../../../client"
import type { ResponseConfig } from "../../../client"
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
            url: `/api/tax/tax/${id}`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
