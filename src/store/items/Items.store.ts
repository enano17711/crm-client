import { Dispatch } from "react"
import { itemsStoreSlice } from "./Items.slice.ts"
import { feature, getAPI } from "../../axios-utils.ts"
import {
   ItemApi,
   ItemDto,
   CreateItemDto,
   UpdateItemDto,
   CreateItemBatchDto,
   ItemBatchDto,
} from "../../api-services"
import { useSelector } from "react-redux"
import { RootStateInterface } from "../root"
import { notifications } from "@mantine/notifications"

/**
 * @name useItemsActions
 * @description Actions hook that allows us to invoke the Items store actions from our components
 */
export function useItemsActions(commit: Dispatch<any>) {
   // get a reference to our slice actions (which are really our mutations/commits)
   const mutations = itemsStoreSlice.actions
   // our items store actions implementation:
   const actions = {
      loadItems: async () => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(getAPI(ItemApi).apiItemItemsGet())
         if (err) {
            console.log("err: ", err)
            console.log("err.message: ", err.message)
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.setItems(res.data.data.items))
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
      addItem: async (item: CreateItemDto) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(getAPI(ItemApi).apiItemItemPost(item))
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.addItem(res.data.data))
            notifications.show({
               title: "Operación Exitosa",
               message: "Datos agregados con éxito",
               color: "teal",
            })
         }
      },
      prepareForCreateBatch: () => {
         commit(mutations.prepareForCreateBatch())
      },
      addItemBatch: async (itemBatch: CreateItemBatchDto) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(ItemApi).apiItemItemBatchPost(itemBatch),
         )
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            const data = {
               ItemBatchDto: res.data.data,
               itemId: itemBatch.itemId,
            }
            commit(mutations.addItemBatch(data))
            notifications.show({
               title: "Operación Exitosa",
               message: "Datos agregados con éxito",
               color: "teal",
            })
         }
      },
      prepareForUpdate: async (item: ItemDto) => {
         commit(mutations.prepareForUpdate(item))
      },
      disposeState: () => {
         commit(mutations.disposeState())
      },
      updateItem: async (itemId: number, item: UpdateItemDto) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(ItemApi).apiItemItemIdPut(itemId, item),
         )
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.updateItem(res.data.data))
            notifications.show({
               title: "Operación Exitosa",
               message: "Datos actualizados con éxito",
               color: "teal",
            })
         }
      },
      prepareForDelete: async (item: ItemDto) => {
         commit(mutations.prepareForDelete(item))
      },
      deleteItem: async (itemId: number) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(ItemApi).apiItemItemIdDelete(itemId),
         )
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.deleteItem(res.data.data.itemId))
            notifications.show({
               title: "Operación Exitosa",
               message: "Datos eliminados con éxito",
               color: "teal",
            })
         }
      },
      prepareForDeleteBatch: (itemBatch: ItemBatchDto) => {
         commit(mutations.prepareForDeleteBatch(itemBatch))
      },
      deleteItemBatch: async (itemBatchId: number) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(ItemApi).apiItemItemBatchIdDelete(itemBatchId),
         )
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            console.log(`res.data.data: ${JSON.stringify(res.data.data)}`)
            const data = {
               itemId: res.data.data.item.itemId,
               itemBatchId: itemBatchId,
            }
            console.log(`data: ${JSON.stringify(data)}`)
            commit(mutations.deleteItemBatch(data))
            notifications.show({
               title: "Operación Exitosa",
               message: "Datos eliminados con éxito",
               color: "teal",
            })
         }
      },
      updateQuantityFromAdjustment: async (data: {
         itemId: number
         quantity: number
         operation: string
      }) => {
         commit(mutations.updateQuantityFromAdjustment(data))
      },
   }
   return actions
}

// hook to allows us to consume read-only state properties from our components
export function useItemsGetters() {
   // return our store getters
   return {
      loading: useSelector((s: RootStateInterface) => s.itemsState.loading),
      items: useSelector((s: RootStateInterface) => s.itemsState.items),
      error: useSelector((s: RootStateInterface) => s.itemsState.error),
      singleModel: useSelector(
         (s: RootStateInterface) => s.itemsState.singleModel,
      ),
      openUpdateModal: useSelector(
         (s: RootStateInterface) => s.itemsState.openUpdateModal,
      ),
      openDeleteModal: useSelector(
         (s: RootStateInterface) => s.itemsState.openDeleteModal,
      ),
      modalType: useSelector((s: RootStateInterface) => s.itemsState.modalType),
      singleModelBatch: useSelector(
         (s: RootStateInterface) => s.itemsState.singleModelBatch,
      ),
      itemIdForBatch: useSelector(
         (s: RootStateInterface) => s.itemsState.itemIdForBatch,
      ),
      openCreateItemBatchModal: useSelector(
         (s: RootStateInterface) => s.itemsState.openCreateItemBatchModal,
      ),
      openDeleteItemBatchModal: useSelector(
         (s: RootStateInterface) => s.itemsState.openDeleteItemBatchModal,
      ),
   }
}

/**
 * @name ItemsStoreInterface
 * @description Interface represents our Items store module
 */
export interface ItemsStoreInterface {
   actions: ReturnType<typeof useItemsActions>
   getters: ReturnType<typeof useItemsGetters>
}
