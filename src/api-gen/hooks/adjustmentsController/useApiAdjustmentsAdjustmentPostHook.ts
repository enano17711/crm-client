import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client"
import type {
   ApiAdjustmentsAdjustmentPostMutationRequest,
   ApiAdjustmentsAdjustmentPostMutationResponse,
} from "../../models/adjustmentsController/ApiAdjustmentsAdjustmentPost"

/**
 * @link /api/adjustments/adjustment
 */

export function useApiAdjustmentsAdjustmentPostHook<
   TData = ApiAdjustmentsAdjustmentPostMutationResponse,
   TError = unknown,
   TVariables = ApiAdjustmentsAdjustmentPostMutationRequest,
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
            url: `/api/adjustments/adjustment`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
