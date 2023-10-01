import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client"
import type {
   ApiCustomerCustomerIdPutMutationRequest,
   ApiCustomerCustomerIdPutMutationResponse,
   ApiCustomerCustomerIdPutPathParams,
} from "../../models/customerController/ApiCustomerCustomerIdPut"

/**
 * @link /api/customer/customer/:id
 */

export function useApiCustomerCustomerIdPutHook<
   TData = ApiCustomerCustomerIdPutMutationResponse,
   TError = unknown,
   TVariables = ApiCustomerCustomerIdPutMutationRequest,
>(
   id: ApiCustomerCustomerIdPutPathParams["id"],
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
            url: `/api/customer/customer/${id}`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
