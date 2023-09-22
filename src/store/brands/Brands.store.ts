import { Dispatch } from "react"
import { brandsStoreSlice } from "./Brands.slice.ts"
import { feature, getAPI } from "../../axios-utils.ts"
import {
   BrandApi,
   BrandDto,
   CreateBrandDto,
   UpdateBrandDto,
} from "../../api-services"
import { useSelector } from "react-redux"
import { RootStateInterface } from "../root"
import { notifications } from "@mantine/notifications"

/**
 * @name useBrandsActions
 * @description Actions hook that allows us to invoke the Brands store actions from our components
 */
export function useBrandsActions(commit: Dispatch<any>) {
   // get a reference to our slice actions (which are really our mutations/commits)
   const mutations = brandsStoreSlice.actions
   // our brands store actions implementation:
   const actions = {
      loadBrands: async () => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(getAPI(BrandApi).apiBrandBrandsGet())
         if (err) {
            commit(mutations.setError(err.message))
            console.log(err)
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.setBrands(res.data.data.items))
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
      addBrand: async (brand: CreateBrandDto) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(BrandApi).apiBrandBrandPost(brand),
         )
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.addBrand(res.data.data))
            notifications.show({
               title: "Operación Exitosa",
               message: "Datos agregados con éxito",
               color: "teal",
            })
         }
      },
      prepareForUpdate: async (brand: BrandDto) => {
         commit(mutations.prepareForUpdate(brand))
      },
      disposeState: () => {
         commit(mutations.disposeState())
      },
      updateBrand: async (brandId: number, brand: UpdateBrandDto) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(BrandApi).apiBrandBrandIdPut(brandId, brand),
         )
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.updateBrand(res.data.data))
            notifications.show({
               title: "Operación Exitosa",
               message: "Datos actualizados con éxito",
               color: "teal",
            })
         }
      },
      prepareForDelete: async (brand: BrandDto) => {
         commit(mutations.prepareForDelete(brand))
      },
      deleteBrand: async (brandId: number) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(BrandApi).apiBrandBrandIdDelete(brandId),
         )
         if (err) {
            commit(mutations.setError(err.message))
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            commit(mutations.deleteBrand(res.data.data.brandId))
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
export function useBrandsGetters() {
   // return our store getters
   return {
      loading: useSelector((s: RootStateInterface) => s.brandsState.loading),
      brands: useSelector((s: RootStateInterface) => s.brandsState.brands),
      error: useSelector((s: RootStateInterface) => s.brandsState.error),
      singleModel: useSelector(
         (s: RootStateInterface) => s.brandsState.singleModel,
      ),
      openUpdateModal: useSelector(
         (s: RootStateInterface) => s.brandsState.openUpdateModal,
      ),
      openDeleteModal: useSelector(
         (s: RootStateInterface) => s.brandsState.openDeleteModal,
      ),
      modalType: useSelector(
         (s: RootStateInterface) => s.brandsState.modalType,
      ),
   }
}

/**
 * @name BrandsStoreInterface
 * @description Interface represents our Brands store module
 */
export interface BrandsStoreInterface {
   actions: ReturnType<typeof useBrandsActions>
   getters: ReturnType<typeof useBrandsGetters>
}
