import type {
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import client from "../../../client"
import type { ResponseConfig } from "../../../client"
import type {
   ApiBaseUnitBaseUnitIdPutMutationRequest,
   ApiBaseUnitBaseUnitIdPutMutationResponse,
   ApiBaseUnitBaseUnitIdPutPathParams,
} from "../../models/baseUnitController/ApiBaseUnitBaseUnitIdPut"

/**
 * @link /api/base-unit/base-unit/:id
 */

export function useApiBaseUnitBaseUnitIdPutHook<
   TData = ApiBaseUnitBaseUnitIdPutMutationResponse,
   TError = unknown,
   TVariables = ApiBaseUnitBaseUnitIdPutMutationRequest,
>(
   id: ApiBaseUnitBaseUnitIdPutPathParams["id"],
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
            url: `/api/base-unit/base-unit/${id}`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
