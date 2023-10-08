import type {
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import client from "../../../client"
import type { ResponseConfig } from "../../../client"
import type {
   ApiItemItemIdPutMutationRequest,
   ApiItemItemIdPutMutationResponse,
   ApiItemItemIdPutPathParams,
} from "../../models/itemController/ApiItemItemIdPut"

/**
 * @link /api/item/item/:id
 */

export function useApiItemItemIdPutHook<
   TData = ApiItemItemIdPutMutationResponse,
   TError = unknown,
   TVariables = ApiItemItemIdPutMutationRequest,
>(
   id: ApiItemItemIdPutPathParams["id"],
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
            url: `/api/item/item/${id}`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
