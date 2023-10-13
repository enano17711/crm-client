import type {
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import client from "../../../client"
import type { ResponseConfig } from "../../../client"
import type {
   ApiCategoryItemDownloadCategoryItemPdfUseridPostMutationResponse,
   ApiCategoryItemDownloadCategoryItemPdfUseridPostPathParams,
} from "../../models/categoryItemController/ApiCategoryItemDownloadCategoryItemPdfUseridPost"

/**
 * @link /api/category-item/download-category-item-pdf/:userid
 */

export function useApiCategoryItemDownloadCategoryItemPdfUseridPostHook<
   TData = ApiCategoryItemDownloadCategoryItemPdfUseridPostMutationResponse,
   TError = unknown,
>(
   userid: ApiCategoryItemDownloadCategoryItemPdfUseridPostPathParams["userid"],
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
            url: `/api/category-item/download-category-item-pdf/${userid}`,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
