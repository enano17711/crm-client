import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client"
import type {
   ApiBaseUnitBaseUnitPostMutationRequest,
   ApiBaseUnitBaseUnitPostMutationResponse,
} from "../../models/baseUnitController/ApiBaseUnitBaseUnitPost"

/**
 * @link /api/base-unit/base-unit
 */

export function useApiBaseUnitBaseUnitPostHook<
   TData = ApiBaseUnitBaseUnitPostMutationResponse,
   TError = unknown,
   TVariables = ApiBaseUnitBaseUnitPostMutationRequest,
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
            url: `/api/base-unit/base-unit`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
