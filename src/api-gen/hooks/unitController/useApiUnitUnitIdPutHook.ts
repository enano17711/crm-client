import type {
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import client from "../../../client"
import type { ResponseConfig } from "../../../client"
import type {
   ApiUnitUnitIdPutMutationRequest,
   ApiUnitUnitIdPutMutationResponse,
   ApiUnitUnitIdPutPathParams,
} from "../../models/unitController/ApiUnitUnitIdPut"

/**
 * @summary Updates a unit with the specified ID using the provided DTO.
 * @link /api/unit/unit/:id
 */

export function useApiUnitUnitIdPutHook<
   TData = ApiUnitUnitIdPutMutationResponse,
   TError = unknown,
   TVariables = ApiUnitUnitIdPutMutationRequest,
>(
   id: ApiUnitUnitIdPutPathParams["id"],
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
            url: `/api/unit/unit/${id}`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
