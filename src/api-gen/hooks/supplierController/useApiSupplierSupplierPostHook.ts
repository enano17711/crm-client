import type {
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import client from "../../../client"
import type { ResponseConfig } from "../../../client"
import type {
   ApiSupplierSupplierPostMutationRequest,
   ApiSupplierSupplierPostMutationResponse,
} from "../../models/supplierController/ApiSupplierSupplierPost"

/**
 * @link /api/supplier/supplier
 */

export function useApiSupplierSupplierPostHook<
   TData = ApiSupplierSupplierPostMutationResponse,
   TError = unknown,
   TVariables = ApiSupplierSupplierPostMutationRequest,
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
            url: `/api/supplier/supplier`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
