import type {
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import client from "../../../client"
import type { ResponseConfig } from "../../../client"
import type {
   ApiItemDownloadItemBatchPdfUseridPostMutationResponse,
   ApiItemDownloadItemBatchPdfUseridPostPathParams,
} from "../../models/itemController/ApiItemDownloadItemBatchPdfUseridPost"

/**
 * @link /api/item/download-item-batch-pdf/:userid
 */

export function useApiItemDownloadItemBatchPdfUseridPostHook<
   TData = ApiItemDownloadItemBatchPdfUseridPostMutationResponse,
   TError = unknown,
>(
   userid: ApiItemDownloadItemBatchPdfUseridPostPathParams["userid"],
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
            method: "post",
            url: `/api/item/download-item-batch-pdf/${userid}`,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
