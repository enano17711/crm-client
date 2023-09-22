import { Dispatch } from "react"
import { adjustmentsStoreSlice } from "./Adjustments.slice.ts"
import { feature, getAPI } from "../../axios-utils.ts"
import {
   AdjustmentsApi,
   AdjustmentDto,
   CreateAdjustmentDto,
} from "../../api-services"
import { useSelector } from "react-redux"
import { RootStateInterface } from "../root"
import { notifications } from "@mantine/notifications"
import { itemsStoreSlice } from "../items"

/**
 * @name useAdjustmentsActions
 * @description Actions hook that allows us to invoke the Adjustments store actions from our components
 */
export function useAdjustmentsActions(commit: Dispatch<any>) {
   // get a reference to our slice actions (which are really our mutations/commits)
   const mutations = adjustmentsStoreSlice.actions
   const itemMutations = itemsStoreSlice.actions
   // our adjustments store actions implementation:
   const actions = {
      loadAdjustments: async () => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(AdjustmentsApi).apiAdjustmentsAdjustmentsGet(),
         )
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.setAdjustments(res.data.data.items))
            notifications.show({
               title: "Operación Exitosa",
               message: "Datos cargados con éxito",
               color: "teal",
            })
         }
      },
      addAdjustment: async (adjustment: CreateAdjustmentDto) => {
         if (
            adjustment.itemAdjustments.length === 0 ||
            !adjustment.itemAdjustments
         ) {
            commit(mutations.setError("Debe agregar al menos un item"))
            notifications.show({
               title: "Operación Fallida",
               message: "Debe agregar al menos un item",
               color: "red",
            })
            return
         }
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(AdjustmentsApi).apiAdjustmentsAdjustmentPost(adjustment),
         )
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.addAdjustment(res.data.data))
            commit(mutations.setLoading(true))
            adjustment.itemAdjustments.forEach((itemFromAdjustment) => {
               commit(
                  itemMutations.updateQuantityFromAdjustment({
                     itemId: itemFromAdjustment.itemId,
                     quantity: itemFromAdjustment.quantity,
                     operation: itemFromAdjustment.action,
                     itemBatchId: itemFromAdjustment.itemBatchId,
                  }),
               )
            })
            commit(mutations.setLoading(false))
            notifications.show({
               title: "Operación Exitosa",
               message: "Datos agregados con éxito",
               color: "teal",
            })
         }
      },
      disposeState: () => {
         commit(mutations.disposeState())
      },
   }
   return actions
}

// hook to allows us to consume read-only state properties from our components
export function useAdjustmentsGetters() {
   // return our store getters
   return {
      loading: useSelector(
         (s: RootStateInterface) => s.adjustmentsState.loading,
      ),
      adjustments: useSelector(
         (s: RootStateInterface) => s.adjustmentsState.adjustments,
      ),
      error: useSelector((s: RootStateInterface) => s.adjustmentsState.error),
   }
}

/**
 * @name AdjustmentsStoreInterface
 * @description Interface represents our Adjustments store module
 */
export interface AdjustmentsStoreInterface {
   actions: ReturnType<typeof useAdjustmentsActions>
   getters: ReturnType<typeof useAdjustmentsGetters>
}
