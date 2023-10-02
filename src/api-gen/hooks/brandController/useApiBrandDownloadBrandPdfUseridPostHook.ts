import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiBrandDownloadBrandPdfUseridPostMutationResponse,
   ApiBrandDownloadBrandPdfUseridPostPathParams,
} from "../../models/brandController/ApiBrandDownloadBrandPdfUseridPost"

/**
 * @link /api/brand/download-brand-pdf/:userid
 */

export function useApiBrandDownloadBrandPdfUseridPostHook<
   TData = ApiBrandDownloadBrandPdfUseridPostMutationResponse,
   TError = unknown,
>(
   userid: ApiBrandDownloadBrandPdfUseridPostPathParams["userid"],
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
            method: "post",
            url: `/api/brand/download-brand-pdf/${userid}`,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
