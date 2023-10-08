import type {
   UseMutationOptions,
   UseMutationResult,
} from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import client from "../../../client"
import type { ResponseConfig } from "../../../client"
import type {
   ApiBaseUnitBaseUnitPostMutationRequest,
   ApiBaseUnitBaseUnitPostMutationResponse,
} from "../../models/baseUnitController/ApiBaseUnitBaseUnitPost"

/**
 * @link /api/base-unit/base-unit
 */

export function useApiBaseUnitBaseUnitPostHook<
   TData = ApiBaseUnitBaseUnitPostMutationResponse,
   TError = unknown,
   TVariables = ApiBaseUnitBaseUnitPostMutationRequest,
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
            url: `/api/base-unit/base-unit`,
            data,

            ...clientOptions,
         })
      },
      ...mutationOptions,
   })
}
