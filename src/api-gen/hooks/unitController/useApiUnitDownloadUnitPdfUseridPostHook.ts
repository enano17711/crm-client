import type {
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import client from "../../../client"
import type { ResponseConfig } from "../../../client"
import type {
   ApiUnitDownloadUnitPdfUseridPostMutationResponse,
   ApiUnitDownloadUnitPdfUseridPostPathParams,
} from "../../models/unitController/ApiUnitDownloadUnitPdfUseridPost"

/**
 * @summary Downloads a PDF file containing information about all units.
 * @link /api/unit/download-unit-pdf/:userid
 */

export function useApiUnitDownloadUnitPdfUseridPostHook<
   TData = ApiUnitDownloadUnitPdfUseridPostMutationResponse,
   TError = unknown,
>(
   userid: ApiUnitDownloadUnitPdfUseridPostPathParams["userid"],
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
            url: `/api/unit/download-unit-pdf/${userid}`,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
