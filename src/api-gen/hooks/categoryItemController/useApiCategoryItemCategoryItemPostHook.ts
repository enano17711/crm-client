import type {
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import client from "../../../client"
import type { ResponseConfig } from "../../../client"
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
      mutation?: UseMutationOptions<ResponseConfig<TData>, TError, TVariables>
      client?: Partial<Parameters<typeof client<TData, TError, TVariables>>[0]>
   } = {},
): UseMutationResult<ResponseConfig<TData>, TError, TVariables> {
   const { mutation: mutationOptions, client: clientOptions = {} } =
      options ?? {}

   return useMutation<ResponseConfig<TData>, TError, TVariables>({
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
