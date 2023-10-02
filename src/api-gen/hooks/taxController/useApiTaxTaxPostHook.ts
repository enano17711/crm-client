import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiTaxTaxPostMutationRequest,
   ApiTaxTaxPostMutationResponse,
} from "../../models/taxController/ApiTaxTaxPost"

/**
 * @link /api/tax/tax
 */

export function useApiTaxTaxPostHook<
   TData = ApiTaxTaxPostMutationResponse,
   TError = unknown,
   TVariables = ApiTaxTaxPostMutationRequest,
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
            url: `/api/tax/tax`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
