import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client"
import type {
   ApiItemItemBatchIdDeleteMutationResponse,
   ApiItemItemBatchIdDeletePathParams,
} from "../../models/itemController/ApiItemItemBatchIdDelete"

/**
 * @link /api/item/item-batch/:id
 */

export function useApiItemItemBatchIdDeleteHook<
   TData = ApiItemItemBatchIdDeleteMutationResponse,
   TError = unknown,
>(
   id: ApiItemItemBatchIdDeletePathParams["id"],
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
            url: `/api/item/item-batch/${id}`,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
