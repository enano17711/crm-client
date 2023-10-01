import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client"
import type {
   ApiItemItemBatchPostMutationRequest,
   ApiItemItemBatchPostMutationResponse,
} from "../../models/itemController/ApiItemItemBatchPost"

/**
 * @link /api/item/item-batch
 */

export function useApiItemItemBatchPostHook<
   TData = ApiItemItemBatchPostMutationResponse,
   TError = unknown,
   TVariables = ApiItemItemBatchPostMutationRequest,
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
            url: `/api/item/item-batch`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
