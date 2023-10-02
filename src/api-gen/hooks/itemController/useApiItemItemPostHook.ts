import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiItemItemPostMutationRequest,
   ApiItemItemPostMutationResponse,
} from "../../models/itemController/ApiItemItemPost"

/**
 * @link /api/item/item
 */

export function useApiItemItemPostHook<
   TData = ApiItemItemPostMutationResponse,
   TError = unknown,
   TVariables = ApiItemItemPostMutationRequest,
>(
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
            method: "post",
            url: `/api/item/item`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
