import { CategoryItemsStateInterface } from "./models"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CategoryItemDto } from "../../api-services"

// create an object that represents our initial items state
const initialCategoryItemsState: CategoryItemsStateInterface = {
   openDeleteModal: false,
   openUpdateModal: false,
   error: null,
   loading: false,
   categoryItems: [],
   singleModel: null,
   modalType: "create",
}

// create the itemsStoreSlice with createSlice:
export const categoryItemsStoreSlice = createSlice({
   name: "categoryItemsStore",
   initialState: initialCategoryItemsState,
   reducers: {
      // reducers are functions that commit final mutations to the state
      // These will commit final mutation/changes to the state
      setLoading: (state, action: PayloadAction<boolean>) => {
         state.loading = action.payload
      },
      setError: (state, action: PayloadAction<string>) => {
         state.error = action.payload
         state.loading = false
      },
      setCategoryItems: (state, action: PayloadAction<CategoryItemDto[]>) => {
         state.error = null
         state.categoryItems = action.payload || []
         state.loading = false
      },
      prepareForCreate: (state) => {
         state.openUpdateModal = true
         state.modalType = "create"
      },
      addCategoryItem: (state, action: PayloadAction<CategoryItemDto>) => {
         state.categoryItems.push(action.payload)
      },
      prepareForUpdate: (state, action: PayloadAction<CategoryItemDto>) => {
         state.singleModel = action.payload
         state.modalType = "update"
         state.openUpdateModal = true
      },
      disposeState: (state) => {
         state.openUpdateModal = false
         state.openDeleteModal = false
         state.error = null
         state.loading = false
         state.singleModel = null
         state.modalType = "create"
      },
      updateCategoryItem: (state, action: PayloadAction<CategoryItemDto>) => {
         state.categoryItems = state.categoryItems.map((categoryItem) =>
            categoryItem.categoryItemId === action.payload.categoryItemId
               ? action.payload
               : categoryItem,
         )
      },
      prepareForDelete: (state, action: PayloadAction<CategoryItemDto>) => {
         state.singleModel = action.payload
         state.openDeleteModal = true
      },
      deleteCategoryItem: (state, action: PayloadAction<number>) => {
         state.categoryItems = state.categoryItems.filter(
            (categoryItem) => categoryItem.categoryItemId !== action.payload,
         )
      },
   },
})
