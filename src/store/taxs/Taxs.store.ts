import { Dispatch } from "react"
import { taxsStoreSlice } from "./Taxs.slice.ts"
import { feature, getAPI } from "../../axios-utils.ts"
import { CreateTaxDto, TaxApi, TaxDto, UpdateTaxDto } from "../../api-services"
import { useSelector } from "react-redux"
import { RootStateInterface } from "../root"
import { notifications } from "@mantine/notifications"

/**
 * @name useTaxsActions
 * @description Actions hook that allows us to invoke the Taxs store actions from our components
 */
export function useTaxsActions(commit: Dispatch<any>) {
   // get a reference to our slice actions (which are really our mutations/commits)
   const mutations = taxsStoreSlice.actions
   // our taxs store actions implementation:
   const actions = {
      loadTaxs: async () => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(getAPI(TaxApi).apiTaxTaxsGet())
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
            commit(mutations.setTaxs(res.data.data?.items))
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
      addTax: async (tax: CreateTaxDto) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(getAPI(TaxApi).apiTaxTaxPost(tax))
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.addTax(res.data.data))
            notifications.show({
               title: "Operación Exitosa",
               message: "Datos agregados con éxito",
               color: "teal",
            })
         }
      },
      prepareForUpdate: async (tax: TaxDto) => {
         commit(mutations.prepareForUpdate(tax))
      },
      disposeState: () => {
         commit(mutations.disposeState())
      },
      updateTax: async (taxId: number, tax: UpdateTaxDto) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(TaxApi).apiTaxTaxIdPut(taxId, tax),
         )
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.updateTax(res.data.data))
            notifications.show({
               title: "Operación Exitosa",
               message: "Datos actualizados con éxito",
               color: "teal",
            })
         }
      },
      prepareForDelete: async (tax: TaxDto) => {
         commit(mutations.prepareForDelete(tax))
      },
      deleteTax: async (taxId: number) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(TaxApi).apiTaxTaxIdDelete(taxId),
         )
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.deleteTax(res.data.data.taxId))
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
export function useTaxsGetters() {
   // return our store getters
   return {
      loading: useSelector((s: RootStateInterface) => s.taxsState.loading),
      taxs: useSelector((s: RootStateInterface) => s.taxsState.taxs),
      error: useSelector((s: RootStateInterface) => s.taxsState.error),
      singleModel: useSelector(
         (s: RootStateInterface) => s.taxsState.singleModel,
      ),
      openUpdateModal: useSelector(
         (s: RootStateInterface) => s.taxsState.openUpdateModal,
      ),
      openDeleteModal: useSelector(
         (s: RootStateInterface) => s.taxsState.openDeleteModal,
      ),
      modalType: useSelector((s: RootStateInterface) => s.taxsState.modalType),
   }
}

/**
 * @name TaxsStoreInterface
 * @description Interface represents our Taxs store module
 */
export interface TaxsStoreInterface {
   actions: ReturnType<typeof useTaxsActions>
   getters: ReturnType<typeof useTaxsGetters>
}
