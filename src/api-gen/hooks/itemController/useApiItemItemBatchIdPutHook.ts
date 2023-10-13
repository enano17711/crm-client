import type {
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import client from "../../../client"
import type { ResponseConfig } from "../../../client"
import type {
   ApiItemItemBatchIdPutMutationRequest,
   ApiItemItemBatchIdPutMutationResponse,
   ApiItemItemBatchIdPutPathParams,
} from "../../models/itemController/ApiItemItemBatchIdPut"

/**
 * @link /api/item/item-batch/:id
 */

export function useApiItemItemBatchIdPutHook<
   TData = ApiItemItemBatchIdPutMutationResponse,
   TError = unknown,
   TVariables = ApiItemItemBatchIdPutMutationRequest,
>(
   id: ApiItemItemBatchIdPutPathParams["id"],
   options: {
      mutation?: UseMutationOptions<ResponseConfig<TData>, TError, TVariables>
      client?: Partial<Parameters<typeof client<TData, TError, TVariables>>[0]>
   } = {},
): UseMutationResult<ResponseConfig<TData>, TError, TVariables> {
   const { mutation: mutationOptions, client: clientOptions = {} } =
      options ?? {}

   return useMutation<ResponseConfig<TData>, TError, TVariables>({
      mutationFn: (data) => {
         return client<TData, TError, TVariables>({
            method: "put",
            url: `/api/item/item-batch/${id}`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
