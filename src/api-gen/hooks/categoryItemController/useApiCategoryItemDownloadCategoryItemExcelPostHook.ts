import type {
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import client from "../../../client"
import type { ResponseConfig } from "../../../client"
import type { ApiCategoryItemDownloadCategoryItemExcelPostMutationResponse } from "../../models/categoryItemController/ApiCategoryItemDownloadCategoryItemExcelPost"

/**
 * @link /api/category-item/download-category-item-excel
 */

export function useApiCategoryItemDownloadCategoryItemExcelPostHook<
   TData = ApiCategoryItemDownloadCategoryItemExcelPostMutationResponse,
   TError = unknown,
>(
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
            url: `/api/category-item/download-category-item-excel`,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
