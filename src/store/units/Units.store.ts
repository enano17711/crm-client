import { Dispatch } from "react"
import { unitsStoreSlice } from "./Units.slice.ts"
import { feature, getAPI } from "../../axios-utils.ts"
import {
   UnitApi,
   UnitDto,
   CreateUnitDto,
   UpdateUnitDto,
} from "../../api-services"
import { useSelector } from "react-redux"
import { RootStateInterface } from "../root"
import { notifications } from "@mantine/notifications"

/**
 * @name useUnitsActions
 * @description Actions hook that allows us to invoke the Units store actions from our components
 */
export function useUnitsActions(commit: Dispatch<any>) {
   // get a reference to our slice actions (which are really our mutations/commits)
   const mutations = unitsStoreSlice.actions
   // our units store actions implementation:
   const actions = {
      loadUnits: async () => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(getAPI(UnitApi).apiUnitUnitsGet())
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
            commit(mutations.setUnits(res.data.data?.items))
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
      addUnit: async (unit: CreateUnitDto) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(getAPI(UnitApi).apiUnitUnitPost(unit))
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.addUnit(res.data.data))
            notifications.show({
               title: "Operación Exitosa",
               message: "Datos agregados con éxito",
               color: "teal",
            })
         }
      },
      prepareForUpdate: async (unit: UnitDto) => {
         commit(mutations.prepareForUpdate(unit))
      },
      disposeState: () => {
         commit(mutations.disposeState())
      },
      updateUnit: async (unitId: number, unit: UpdateUnitDto) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(UnitApi).apiUnitUnitIdPut(unitId, unit),
         )
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.updateUnit(res.data.data))
            notifications.show({
               title: "Operación Exitosa",
               message: "Datos actualizados con éxito",
               color: "teal",
            })
         }
      },
      prepareForDelete: async (unit: UnitDto) => {
         commit(mutations.prepareForDelete(unit))
      },
      deleteUnit: async (unitId: number) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(UnitApi).apiUnitUnitIdDelete(unitId),
         )
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.deleteUnit(res.data.data.unitId))
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
export function useUnitsGetters() {
   // return our store getters
   return {
      loading: useSelector((s: RootStateInterface) => s.unitsState.loading),
      units: useSelector((s: RootStateInterface) => s.unitsState.units),
      error: useSelector((s: RootStateInterface) => s.unitsState.error),
      singleModel: useSelector(
         (s: RootStateInterface) => s.unitsState.singleModel,
      ),
      openUpdateModal: useSelector(
         (s: RootStateInterface) => s.unitsState.openUpdateModal,
      ),
      openDeleteModal: useSelector(
         (s: RootStateInterface) => s.unitsState.openDeleteModal,
      ),
      modalType: useSelector((s: RootStateInterface) => s.unitsState.modalType),
   }
}

/**
 * @name UnitsStoreInterface
 * @description Interface represents our Units store module
 */
export interface UnitsStoreInterface {
   actions: ReturnType<typeof useUnitsActions>
   getters: ReturnType<typeof useUnitsGetters>
}
