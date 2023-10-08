import type {
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import client from "../../../client"
import type { ResponseConfig } from "../../../client"
import type {
   ApiCategoryItemCategoryItemIdPutMutationRequest,
   ApiCategoryItemCategoryItemIdPutMutationResponse,
   ApiCategoryItemCategoryItemIdPutPathParams,
} from "../../models/categoryItemController/ApiCategoryItemCategoryItemIdPut"

/**
 * @link /api/category-item/category-item/:id
 */

export function useApiCategoryItemCategoryItemIdPutHook<
   TData = ApiCategoryItemCategoryItemIdPutMutationResponse,
   TError = unknown,
   TVariables = ApiCategoryItemCategoryItemIdPutMutationRequest,
>(
   id: ApiCategoryItemCategoryItemIdPutPathParams["id"],
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
            url: `/api/category-item/category-item/${id}`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
