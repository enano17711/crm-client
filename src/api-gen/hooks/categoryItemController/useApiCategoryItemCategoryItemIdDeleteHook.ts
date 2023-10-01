import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client"
import type {
   ApiCategoryItemCategoryItemIdDeleteMutationResponse,
   ApiCategoryItemCategoryItemIdDeletePathParams,
} from "../../models/categoryItemController/ApiCategoryItemCategoryItemIdDelete"

/**
 * @link /api/category-item/category-item/:id
 */

export function useApiCategoryItemCategoryItemIdDeleteHook<
   TData = ApiCategoryItemCategoryItemIdDeleteMutationResponse,
   TError = unknown,
>(
   id: ApiCategoryItemCategoryItemIdDeletePathParams["id"],
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
            url: `/api/category-item/category-item/${id}`,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
