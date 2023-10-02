import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiCategoryItemCategoryItemPostMutationRequest,
   ApiCategoryItemCategoryItemPostMutationResponse,
} from "../../models/categoryItemController/ApiCategoryItemCategoryItemPost"

/**
 * @link /api/category-item/category-item
 */

export function useApiCategoryItemCategoryItemPostHook<
   TData = ApiCategoryItemCategoryItemPostMutationResponse,
   TError = unknown,
   TVariables = ApiCategoryItemCategoryItemPostMutationRequest,
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
            url: `/api/category-item/category-item`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
