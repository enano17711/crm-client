import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client"
import type {
   ApiUnitUnitIdDeleteMutationResponse,
   ApiUnitUnitIdDeletePathParams,
} from "../../models/unitController/ApiUnitUnitIdDelete"

/**
 * @link /api/unit/unit/:id
 */

export function useApiUnitUnitIdDeleteHook<
   TData = ApiUnitUnitIdDeleteMutationResponse,
   TError = unknown,
>(
   id: ApiUnitUnitIdDeletePathParams["id"],
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
            url: `/api/unit/unit/${id}`,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
