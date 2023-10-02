import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
import type {
   ApiUnitUnitIdPutMutationRequest,
   ApiUnitUnitIdPutMutationResponse,
   ApiUnitUnitIdPutPathParams,
} from "../../models/unitController/ApiUnitUnitIdPut"

/**
 * @link /api/unit/unit/:id
 */

export function useApiUnitUnitIdPutHook<
   TData = ApiUnitUnitIdPutMutationResponse,
   TError = unknown,
   TVariables = ApiUnitUnitIdPutMutationRequest,
>(
   id: ApiUnitUnitIdPutPathParams["id"],
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
            method: "put",
            url: `/api/unit/unit/${id}`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
