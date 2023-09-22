import { Dispatch } from "react"
import { customersStoreSlice } from "./Customers.slice.ts"
import { feature, getAPI } from "../../axios-utils.ts"
import {
   CreateCustomerDto,
   CustomerApi,
   CustomerDto,
   UpdateCustomerDto,
} from "../../api-services"
import { useSelector } from "react-redux"
import { RootStateInterface } from "../root"
import { notifications } from "@mantine/notifications"

export function useCustomersActions(commit: Dispatch<any>) {
   const mutations = customersStoreSlice.actions
   const actions = {
      loadCustomers: async () => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(CustomerApi).apiCustomerCustomersGet(),
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
            commit(mutations.setCustomers(res.data.data.items))
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
      addCustomer: async (customer: CreateCustomerDto) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(CustomerApi).apiCustomerCustomerPost(customer),
         )
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.addCustomer(res.data.data))
            notifications.show({
               title: "Operación Exitosa",
               message: "Datos agregados con éxito",
               color: "teal",
            })
         }
      },
      prepareForUpdate: async (customer: CustomerDto) => {
         commit(mutations.prepareForUpdate(customer))
      },
      disposeState: () => {
         commit(mutations.disposeState())
      },
      updateCustomer: async (
         customerId: number,
         customer: UpdateCustomerDto,
      ) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(CustomerApi).apiCustomerCustomerIdPut(customerId, customer),
         )
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.updateCustomer(res.data.data))
            notifications.show({
               title: "Operación Exitosa",
               message: "Datos actualizados con éxito",
               color: "teal",
            })
         }
      },
      prepareForDelete: async (customer: CustomerDto) => {
         commit(mutations.prepareForDelete(customer))
      },
      deleteCustomer: async (customerId: number) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(CustomerApi).apiCustomerCustomerIdDelete(customerId),
         )
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.deleteCustomer(res.data.data.customerId))
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

export function useCustomersGetters() {
   return {
      loading: useSelector((s: RootStateInterface) => s.customersState.loading),
      customers: useSelector(
         (s: RootStateInterface) => s.customersState.customers,
      ),
      error: useSelector((s: RootStateInterface) => s.customersState.error),
      singleModel: useSelector(
         (s: RootStateInterface) => s.customersState.singleModel,
      ),
      openUpdateModal: useSelector(
         (s: RootStateInterface) => s.customersState.openUpdateModal,
      ),
      openDeleteModal: useSelector(
         (s: RootStateInterface) => s.customersState.openDeleteModal,
      ),
      modalType: useSelector(
         (s: RootStateInterface) => s.customersState.modalType,
      ),
   }
}

export interface CustomersStoreInterface {
   actions: ReturnType<typeof useCustomersActions>
   getters: ReturnType<typeof useCustomersGetters>
}
