import { Dispatch } from "react"
import { categoryItemsStoreSlice } from "./CategoryItems.slice.ts"
import { feature, getAPI } from "../../axios-utils.ts"
import {
   CreateCategoryItemDto,
   CategoryItemApi,
   CategoryItemDto,
   UpdateCategoryItemDto,
} from "../../api-services"
import { useSelector } from "react-redux"
import { RootStateInterface } from "../root"
import { notifications } from "@mantine/notifications"

/**
 * @name useCategoryItemsActions
 * @description Actions hook that allows us to invoke the CategoryItems store actions from our components
 */
export function useCategoryItemsActions(commit: Dispatch<any>) {
   // get a reference to our slice actions (which are really our mutations/commits)
   const mutations = categoryItemsStoreSlice.actions
   // our categoryItems store actions implementation:
   const actions = {
      loadCategoryItems: async () => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(CategoryItemApi).apiCategoryItemCategoryItemsGet(),
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
            commit(mutations.setCategoryItems(res.data.data.items))
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
      addCategoryItem: async (categoryItem: CreateCategoryItemDto) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(CategoryItemApi).apiCategoryItemCategoryItemPost(
               categoryItem,
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
            commit(mutations.addCategoryItem(res.data.data))
            notifications.show({
               title: "Operación Exitosa",
               message: "Datos agregados con éxito",
               color: "teal",
            })
         }
      },
      prepareForUpdate: async (categoryItem: CategoryItemDto) => {
         commit(mutations.prepareForUpdate(categoryItem))
      },
      disposeState: () => {
         commit(mutations.disposeState())
      },
      updateCategoryItem: async (
         categoryItemId: number,
         categoryItem: UpdateCategoryItemDto,
      ) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(CategoryItemApi).apiCategoryItemCategoryItemIdPut(
               categoryItemId,
               categoryItem,
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
            commit(mutations.updateCategoryItem(res.data.data))
            notifications.show({
               title: "Operación Exitosa",
               message: "Datos actualizados con éxito",
               color: "teal",
            })
         }
      },
      prepareForDelete: async (categoryItem: CategoryItemDto) => {
         commit(mutations.prepareForDelete(categoryItem))
      },
      deleteCategoryItem: async (categoryItemId: number) => {
         commit(mutations.setLoading(true))
         const [err, res] = await feature(
            getAPI(CategoryItemApi).apiCategoryItemCategoryItemIdDelete(
               categoryItemId,
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
            commit(mutations.deleteCategoryItem(res.data.data.categoryItemId))
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
export function useCategoryItemsGetters() {
   // return our store getters
   return {
      loading: useSelector(
         (s: RootStateInterface) => s.categoryItemsState.loading,
      ),
      categoryItems: useSelector(
         (s: RootStateInterface) => s.categoryItemsState.categoryItems,
      ),
      error: useSelector((s: RootStateInterface) => s.categoryItemsState.error),
      singleModel: useSelector(
         (s: RootStateInterface) => s.categoryItemsState.singleModel,
      ),
      openUpdateModal: useSelector(
         (s: RootStateInterface) => s.categoryItemsState.openUpdateModal,
      ),
      openDeleteModal: useSelector(
         (s: RootStateInterface) => s.categoryItemsState.openDeleteModal,
      ),
      modalType: useSelector(
         (s: RootStateInterface) => s.categoryItemsState.modalType,
      ),
   }
}

/**
 * @name CategoryItemsStoreInterface
 * @description Interface represents our CategoryItems store module
 */
export interface CategoryItemsStoreInterface {
   actions: ReturnType<typeof useCategoryItemsActions>
   getters: ReturnType<typeof useCategoryItemsGetters>
}
