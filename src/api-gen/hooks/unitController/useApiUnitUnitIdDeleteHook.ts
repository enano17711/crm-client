import type {
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import client from "../../../client"
import type { ResponseConfig } from "../../../client"
import type {
   ApiUnitUnitIdDeleteMutationResponse,
   ApiUnitUnitIdDeletePathParams,
} from "../../models/unitController/ApiUnitUnitIdDelete"

/**
 * @summary Deletes a unit with the specified ID.
 * @link /api/unit/unit/:id
 */

export function useApiUnitUnitIdDeleteHook<
   TData = ApiUnitUnitIdDeleteMutationResponse,
   TError = unknown,
>(
   id: ApiUnitUnitIdDeletePathParams["id"],
   options: {
      mutation?: UseMutationOptions<ResponseConfig<TData>, TError, void>
      client?: Partial<Parameters<typeof client<TData, TError, void>>[0]>
   } = {},
): UseMutationResult<ResponseConfig<TData>, TError, void> {
   const { mutation: mutationOptions, client: clientOptions = {} } =
      options ?? {}

   return useMutation<ResponseConfig<TData>, TError, void>({
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
