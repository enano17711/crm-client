import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type { ApiBrandDownloadBrandExcelPostMutationResponse } from "../../models/brandController/ApiBrandDownloadBrandExcelPost"

/**
 * @link /api/brand/download-brand-excel
 */

export function useApiBrandDownloadBrandExcelPostHook<
   TData = ApiBrandDownloadBrandExcelPostMutationResponse,
   TError = unknown,
>(
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
            url: `/api/brand/download-brand-excel`,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
