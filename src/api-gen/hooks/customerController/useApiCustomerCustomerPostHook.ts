import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiCustomerCustomerPostMutationRequest,
   ApiCustomerCustomerPostMutationResponse,
} from "../../models/customerController/ApiCustomerCustomerPost"

/**
 * @link /api/customer/customer
 */

export function useApiCustomerCustomerPostHook<
   TData = ApiCustomerCustomerPostMutationResponse,
   TError = unknown,
   TVariables = ApiCustomerCustomerPostMutationRequest,
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
            url: `/api/customer/customer`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
