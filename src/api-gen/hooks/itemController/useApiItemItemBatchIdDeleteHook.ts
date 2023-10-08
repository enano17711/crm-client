import type {
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import client from "../../../client"
import type { ResponseConfig } from "../../../client"
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
      mutation?: UseMutationOptions<ResponseConfig<TData>, TError, void>
      client?: Partial<Parameters<typeof client<TData, TError, void>>[0]>
   } = {},
): UseMutationResult<ResponseConfig<TData>, TError, void> {
   const { mutation: mutationOptions, client: clientOptions = {} } =
      options ?? {}

   return useMutation<ResponseConfig<TData>, TError, void>({
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
