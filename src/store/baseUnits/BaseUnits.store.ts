import { Dispatch } from "react"
import { baseUnitsStoreSlice } from "./BaseUnits.slice.ts"
import { feature, getAPI } from "../../axios-utils.ts"
import {
   BaseUnitApi,
   BaseUnitDto,
   CreateBaseUnitDto,
   UpdateBaseUnitDto,
} from "../../api-services"
import { useSelector } from "react-redux"
import { RootStateInterface } from "../root"
import { notifications } from "@mantine/notifications"

/**
 * @name useBaseUnitsActions
 * @description Actions hook that allows us to invoke the BaseUnits store actions from our components
 */
export function useBaseUnitsActions(commit: Dispatch<any>) {
   // get a reference to our slice actions (which are really our mutations/commits)
   const mutations = baseUnitsStoreSlice.actions
   // our baseUnits store actions implementation:
   const actions = {
      loadBaseUnits: async () => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(BaseUnitApi).apiBaseUnitBaseUnitsGet(),
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
            commit(mutations.setBaseUnits(res.data.data?.items))
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
      addBaseUnit: async (baseUnit: CreateBaseUnitDto) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(BaseUnitApi).apiBaseUnitBaseUnitPost(baseUnit),
         )
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.addBaseUnit(res.data.data))
            notifications.show({
               title: "Operación Exitosa",
               message: "Datos agregados con éxito",
               color: "teal",
            })
         }
      },
      prepareForUpdate: async (baseUnit: BaseUnitDto) => {
         commit(mutations.prepareForUpdate(baseUnit))
      },
      disposeState: () => {
         commit(mutations.disposeState())
      },
      updateBaseUnit: async (
         baseUnitId: number,
         baseUnit: UpdateBaseUnitDto,
      ) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(BaseUnitApi).apiBaseUnitBaseUnitIdPut(baseUnitId, baseUnit),
         )
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.updateBaseUnit(res.data.data))
            notifications.show({
               title: "Operación Exitosa",
               message: "Datos actualizados con éxito",
               color: "teal",
            })
         }
      },
      prepareForDelete: async (baseUnit: BaseUnitDto) => {
         commit(mutations.prepareForDelete(baseUnit))
      },
      deleteBaseUnit: async (baseUnitId: number) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(BaseUnitApi).apiBaseUnitBaseUnitIdDelete(baseUnitId),
         )
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.deleteBaseUnit(res.data.data.baseUnitId))
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
export function useBaseUnitsGetters() {
   // return our store getters
   return {
      loading: useSelector((s: RootStateInterface) => s.baseUnitsState.loading),
      baseUnits: useSelector(
         (s: RootStateInterface) => s.baseUnitsState.baseUnits,
      ),
      error: useSelector((s: RootStateInterface) => s.baseUnitsState.error),
      singleModel: useSelector(
         (s: RootStateInterface) => s.baseUnitsState.singleModel,
      ),
      openUpdateModal: useSelector(
         (s: RootStateInterface) => s.baseUnitsState.openUpdateModal,
      ),
      openDeleteModal: useSelector(
         (s: RootStateInterface) => s.baseUnitsState.openDeleteModal,
      ),
      modalType: useSelector(
         (s: RootStateInterface) => s.baseUnitsState.modalType,
      ),
   }
}

/**
 * @name BaseUnitsStoreInterface
 * @description Interface represents our BaseUnits store module
 */
export interface BaseUnitsStoreInterface {
   actions: ReturnType<typeof useBaseUnitsActions>
   getters: ReturnType<typeof useBaseUnitsGetters>
}
