import { Dispatch } from "react"
import { salesStoreSlice } from "./Sales.slice.ts"
import { feature, getAPI } from "../../axios-utils.ts"
import {
   SaleApi,
   SaleDto,
   CreateSaleDto,
   BrandDto,
   ItemSaleDto,
   UpdateBrandDto,
   BrandApi,
} from "../../api-services"
import { useSelector } from "react-redux"
import { RootStateInterface } from "../root"
import { notifications } from "@mantine/notifications"
import { itemsStoreSlice } from "../items"
import { PayloadAction } from "@reduxjs/toolkit"
import { createStore } from "devextreme-aspnet-data-nojquery"

export function useSalesActions(commit: Dispatch<any>) {
   const mutations = salesStoreSlice.actions
   const itemMutations = itemsStoreSlice.actions
   const actions = {
      loadSales: async () => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(getAPI(SaleApi).apiSaleSalesGet())
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.setSales(res.data.data.items))
            notifications.show({
               title: "Operación Exitosa",
               message: "Datos cargados con éxito",
               color: "teal",
            })
         }
      },
      addSale: async (sale: CreateSaleDto) => {
         if (sale.itemSales.length === 0 || !sale.itemSales) {
            commit(mutations.setError("Debe agregar al menos un item"))
            notifications.show({
               title: "Operación Fallida",
               message: "Debe agregar al menos un item",
               color: "red",
            })
            return
         }
         commit(mutations.setLoading(true))
         const [err, res] = await feature(getAPI(SaleApi).apiSaleSalePost(sale))
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.addSale(res.data.data))
            commit(mutations.setLoading(true))
            commit(mutations.setLoading(false))
            notifications.show({
               title: "Operación Exitosa",
               message: "Datos agregados con éxito",
               color: "teal",
            })
         }
      },
      prepareForStatus: async (itemSale: ItemSaleDto) => {
         commit(mutations.prepareForStatus(itemSale))
      },
      updateSaleStatus: async (saleId: number, status: string) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(SaleApi).apiSaleSaleStatusSaleidStatusPut(saleId, status),
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
      prepareForUpdate: async (itemSale: ItemSaleDto) => {
         commit(mutations.prepareForUpdate(itemSale))
      },
      updateItemSale: async (itemSaleId: number, quantity: number) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(SaleApi).apiSaleItemSaleQuantityItemsaleidQuantityPut(
               itemSaleId,
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

export function useSalesGetters() {
   return {
      loading: useSelector((s: RootStateInterface) => s.salesState.loading),
      sales: useSelector((s: RootStateInterface) => s.salesState.sales),
      error: useSelector((s: RootStateInterface) => s.salesState.error),
      singleModel: useSelector(
         (s: RootStateInterface) => s.salesState.singleModel,
      ),
      openUpdateModal: useSelector(
         (s: RootStateInterface) => s.salesState.openUpdateModal,
      ),
      openStatusModal: useSelector(
         (s: RootStateInterface) => s.salesState.openStatusModal,
      ),
   }
}

export interface SalesStoreInterface {
   actions: ReturnType<typeof useSalesActions>
   getters: ReturnType<typeof useSalesGetters>
}
