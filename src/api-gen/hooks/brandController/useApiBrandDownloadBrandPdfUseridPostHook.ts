import type {
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import client from "../../../client"
import type { ResponseConfig } from "../../../client"
import type {
   ApiBrandDownloadBrandPdfUseridPostMutationResponse,
   ApiBrandDownloadBrandPdfUseridPostPathParams,
} from "../../models/brandController/ApiBrandDownloadBrandPdfUseridPost"

/**
 * @summary Downloads a PDF file containing brands.
 * @link /api/brand/download-brand-pdf/:userid
 */

export function useApiBrandDownloadBrandPdfUseridPostHook<
   TData = ApiBrandDownloadBrandPdfUseridPostMutationResponse,
   TError = unknown,
>(
   userid: ApiBrandDownloadBrandPdfUseridPostPathParams["userid"],
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
            url: `/api/brand/download-brand-pdf/${userid}`,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
