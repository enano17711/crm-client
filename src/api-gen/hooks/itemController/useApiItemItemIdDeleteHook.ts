import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client"
import type {
   ApiItemItemIdDeleteMutationResponse,
   ApiItemItemIdDeletePathParams,
} from "../../models/itemController/ApiItemItemIdDelete"

/**
 * @link /api/item/item/:id
 */

export function useApiItemItemIdDeleteHook<
   TData = ApiItemItemIdDeleteMutationResponse,
   TError = unknown,
>(
   id: ApiItemItemIdDeletePathParams["id"],
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
            method: "delete",
            url: `/api/item/item/${id}`,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
