import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiSupplierSupplierIdDeleteMutationResponse,
   ApiSupplierSupplierIdDeletePathParams,
} from "../../models/supplierController/ApiSupplierSupplierIdDelete"

/**
 * @link /api/supplier/supplier/:id
 */

export function useApiSupplierSupplierIdDeleteHook<
   TData = ApiSupplierSupplierIdDeleteMutationResponse,
   TError = unknown,
>(
   id: ApiSupplierSupplierIdDeletePathParams["id"],
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
            url: `/api/supplier/supplier/${id}`,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
