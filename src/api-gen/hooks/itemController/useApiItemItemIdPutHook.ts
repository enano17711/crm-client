import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client"
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
      mutation?: UseMutationOptions<TData, TError, TVariables>
      client?: Partial<Parameters<typeof client<TData, TError, TVariables>>[0]>
   } = {},
): UseMutationResult<TData, TError, TVariables> {
   const { mutation: mutationOptions, client: clientOptions = {} } =
      options ?? {}

   return useMutation<TData, TError, TVariables>({
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
