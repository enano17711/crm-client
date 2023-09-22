import { Dispatch } from "react"
import { suppliersStoreSlice } from "./Suppliers.slice.ts"
import { feature, getAPI } from "../../axios-utils.ts"
import {
   CreateSupplierDto,
   SupplierApi,
   SupplierDto,
   UpdateSupplierDto,
} from "../../api-services"
import { useSelector } from "react-redux"
import { RootStateInterface } from "../root"
import { notifications } from "@mantine/notifications"

/**
 * @name useSuppliersActions
 * @description Actions hook that allows us to invoke the Suppliers store actions from our components
 */
export function useSuppliersActions(commit: Dispatch<any>) {
   // get a reference to our slice actions (which are really our mutations/commits)
   const mutations = suppliersStoreSlice.actions
   // our suppliers store actions implementation:
   const actions = {
      loadSuppliers: async () => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(SupplierApi).apiSupplierSuppliersGet(),
         )
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
            commit(mutations.setSuppliers(res.data.data.items))
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
      addSupplier: async (supplier: CreateSupplierDto) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(SupplierApi).apiSupplierSupplierPost(supplier),
         )
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.addSupplier(res.data.data))
            notifications.show({
               title: "Operación Exitosa",
               message: "Datos agregados con éxito",
               color: "teal",
            })
         }
      },
      prepareForUpdate: async (supplier: SupplierDto) => {
         commit(mutations.prepareForUpdate(supplier))
      },
      disposeState: () => {
         commit(mutations.disposeState())
      },
      updateSupplier: async (
         supplierId: number,
         supplier: UpdateSupplierDto,
      ) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(SupplierApi).apiSupplierSupplierIdPut(supplierId, supplier),
         )
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.updateSupplier(res.data.data))
            notifications.show({
               title: "Operación Exitosa",
               message: "Datos actualizados con éxito",
               color: "teal",
            })
         }
      },
      prepareForDelete: async (supplier: SupplierDto) => {
         commit(mutations.prepareForDelete(supplier))
      },
      deleteSupplier: async (supplierId: number) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(SupplierApi).apiSupplierSupplierIdDelete(supplierId),
         )
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.deleteSupplier(res.data.data.supplierId))
            notifications.show({
               title: "Operación Exitosa",
               message: "Datos eliminados con éxito",
               color: "teal",
            })
         }
      },
   }
   return actions
}

// hook to allows us to consume read-only state properties from our components
export function useSuppliersGetters() {
   // return our store getters
   return {
      loading: useSelector((s: RootStateInterface) => s.suppliersState.loading),
      suppliers: useSelector(
         (s: RootStateInterface) => s.suppliersState.suppliers,
      ),
      error: useSelector((s: RootStateInterface) => s.suppliersState.error),
      singleModel: useSelector(
         (s: RootStateInterface) => s.suppliersState.singleModel,
      ),
      openUpdateModal: useSelector(
         (s: RootStateInterface) => s.suppliersState.openUpdateModal,
      ),
      openDeleteModal: useSelector(
         (s: RootStateInterface) => s.suppliersState.openDeleteModal,
      ),
      modalType: useSelector(
         (s: RootStateInterface) => s.suppliersState.modalType,
      ),
   }
}

/**
 * @name SuppliersStoreInterface
 * @description Interface represents our Suppliers store module
 */
export interface SuppliersStoreInterface {
   actions: ReturnType<typeof useSuppliersActions>
   getters: ReturnType<typeof useSuppliersGetters>
}
