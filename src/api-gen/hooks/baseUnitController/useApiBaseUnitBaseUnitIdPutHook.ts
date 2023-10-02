import {
   useMutation,
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import client from "../../../client.ts"
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
            url: `/api/base-unit/base-unit/${id}`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
