import { Dispatch } from "react"
import { feature, getAPI } from "../../axios-utils.ts"
import { OrderReturnApi } from "../../api-services"
import { useSelector } from "react-redux"
import { RootStateInterface } from "../root"
import { notifications } from "@mantine/notifications"
import { orderReturnsStoreSlice } from "./OrderReturns.slice.ts"

export function useOrderReturnsActions(commit: Dispatch<any>) {
   const mutations = orderReturnsStoreSlice.actions
   const actions = {
      loadOrderReturns: async () => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(OrderReturnApi).apiOrderReturnOrderReturnsGet(),
         )
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.setOrderReturns(res.data.data.items))
            notifications.show({
               title: "Operación Exitosa",
               message: "Datos cargados con éxito",
               color: "teal",
            })
         }
      },
      prepareForCreate: () => {
         commit(mutations.prepareForCreate())
      },
      addOrderReturn: async (orderId: number, staffNote: string) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(OrderReturnApi).apiOrderReturnOrderReturnPost({
               orderId: orderId,
               staffNote: staffNote,
            }),
         )
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
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

export function useOrderReturnsGetters() {
   return {
      loading: useSelector(
         (s: RootStateInterface) => s.orderReturnsState.loading,
      ),
      error: useSelector((s: RootStateInterface) => s.orderReturnsState.error),
      openUpdateModal: useSelector(
         (s: RootStateInterface) => s.orderReturnsState.openUpdateModal,
      ),
      orderReturns: useSelector(
         (s: RootStateInterface) => s.orderReturnsState.orderReturns,
      ),
   }
}

export interface OrderReturnsStoreInterface {
   actions: ReturnType<typeof useOrderReturnsActions>
   getters: ReturnType<typeof useOrderReturnsGetters>
}
