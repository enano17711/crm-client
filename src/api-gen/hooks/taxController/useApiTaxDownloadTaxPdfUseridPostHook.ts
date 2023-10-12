import type {
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import client from "../../../client"
import type { ResponseConfig } from "../../../client"
import type {
   ApiTaxDownloadTaxPdfUseridPostMutationResponse,
   ApiTaxDownloadTaxPdfUseridPostPathParams,
} from "../../models/taxController/ApiTaxDownloadTaxPdfUseridPost"

/**
 * @link /api/tax/download-tax-pdf/:userid
 */

export function useApiTaxDownloadTaxPdfUseridPostHook<
   TData = ApiTaxDownloadTaxPdfUseridPostMutationResponse,
   TError = unknown,
>(
   userid: ApiTaxDownloadTaxPdfUseridPostPathParams["userid"],
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
            url: `/api/tax/download-tax-pdf/${userid}`,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
