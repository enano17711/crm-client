import { Dispatch } from "react"
import { ordersStoreSlice } from "./Orders.slice.ts"
import { feature, getAPI } from "../../axios-utils.ts"
import {
   OrderApi,
   OrderDto,
   CreateOrderDto,
   BrandDto,
   ItemOrderDto,
   UpdateBrandDto,
   BrandApi,
} from "../../api-services"
import { useSelector } from "react-redux"
import { RootStateInterface } from "../root"
import { notifications } from "@mantine/notifications"
import { itemsStoreSlice } from "../items"
import { PayloadAction } from "@reduxjs/toolkit"
import { createStore } from "devextreme-aspnet-data-nojquery"

/**
 * @name useOrdersActions
 * @description Actions hook that allows us to invoke the Orders store actions from our components
 */
export function useOrdersActions(commit: Dispatch<any>) {
   // get a reference to our slice actions (which are really our mutations/commits)
   const mutations = ordersStoreSlice.actions
   const itemMutations = itemsStoreSlice.actions
   // our orders store actions implementation:
   const actions = {
      loadOrders: async () => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(getAPI(OrderApi).apiOrderOrdersGet())
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.setOrders(res.data.data.items))
            notifications.show({
               title: "Operación Exitosa",
               message: "Datos cargados con éxito",
               color: "teal",
            })
         }
      },
      addOrder: async (order: CreateOrderDto) => {
         if (order.itemOrders.length === 0 || !order.itemOrders) {
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
            getAPI(OrderApi).apiOrderOrderPost(order),
         )
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.addOrder(res.data.data))
            commit(mutations.setLoading(true))
            /*            order.itemOrders.forEach((itemFromOrder) => {
               commit(
                  itemMutations.updateQuantityFromOrder({
                     itemId: itemFromOrder.itemId,
                     quantity: itemFromOrder.quantity,
                     operation: itemFromOrder.action,
                     itemBatchId: itemFromOrder.itemBatchId,
                  }),
               )
            })*/
            commit(mutations.setLoading(false))
            notifications.show({
               title: "Operación Exitosa",
               message: "Datos agregados con éxito",
               color: "teal",
            })
         }
      },
      prepareForStatus: async (itemOrder: ItemOrderDto) => {
         commit(mutations.prepareForStatus(itemOrder))
      },
      updateOrderStatus: async (orderId: number, status: string) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(OrderApi).apiOrderOrderStatusOrderidStatusPut(
               orderId,
               status,
            ),
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
               message: "Datos actualizados con éxito",
               color: "teal",
            })
         }
      },
      prepareForUpdate: async (itemOrder: ItemOrderDto) => {
         commit(mutations.prepareForUpdate(itemOrder))
      },
      updateItemOrder: async (itemOrderId: number, quantity: number) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(OrderApi).apiOrderItemOrderQuantityItemorderidQuantityPut(
               itemOrderId,
               quantity,
            ),
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
               message: "Datos actualizados con éxito",
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
export function useOrdersGetters() {
   // return our store getters
   return {
      loading: useSelector((s: RootStateInterface) => s.ordersState.loading),
      orders: useSelector((s: RootStateInterface) => s.ordersState.orders),
      error: useSelector((s: RootStateInterface) => s.ordersState.error),
      singleModel: useSelector(
         (s: RootStateInterface) => s.ordersState.singleModel,
      ),
      openUpdateModal: useSelector(
         (s: RootStateInterface) => s.ordersState.openUpdateModal,
      ),
      openStatusModal: useSelector(
         (s: RootStateInterface) => s.ordersState.openStatusModal,
      ),
   }
}

/**
 * @name OrdersStoreInterface
 * @description Interface represents our Orders store module
 */
export interface OrdersStoreInterface {
   actions: ReturnType<typeof useOrdersActions>
   getters: ReturnType<typeof useOrdersGetters>
}
