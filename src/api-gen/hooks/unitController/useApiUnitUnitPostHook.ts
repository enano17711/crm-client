import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiUnitUnitPostMutationRequest,
   ApiUnitUnitPostMutationResponse,
} from "../../models/unitController/ApiUnitUnitPost"

/**
 * @link /api/unit/unit
 */

export function useApiUnitUnitPostHook<
   TData = ApiUnitUnitPostMutationResponse,
   TError = unknown,
   TVariables = ApiUnitUnitPostMutationRequest,
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
            url: `/api/unit/unit`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
