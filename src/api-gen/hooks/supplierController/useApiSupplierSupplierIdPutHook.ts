import type {
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import client from "../../../client"
import type { ResponseConfig } from "../../../client"
import type {
   ApiSupplierSupplierIdPutMutationRequest,
   ApiSupplierSupplierIdPutMutationResponse,
   ApiSupplierSupplierIdPutPathParams,
} from "../../models/supplierController/ApiSupplierSupplierIdPut"

/**
 * @link /api/supplier/supplier/:id
 */

export function useApiSupplierSupplierIdPutHook<
   TData = ApiSupplierSupplierIdPutMutationResponse,
   TError = unknown,
   TVariables = ApiSupplierSupplierIdPutMutationRequest,
>(
   id: ApiSupplierSupplierIdPutPathParams["id"],
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
            url: `/api/supplier/supplier/${id}`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
