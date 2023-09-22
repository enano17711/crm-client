import { BrandsStateInterface } from "./models"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BrandDto } from "../../api-services"

// create an object that represents our initial items state
const initialBrandsState: BrandsStateInterface = {
   openDeleteModal: false,
   openUpdateModal: false,
   error: null,
   loading: false,
   brands: [],
   singleModel: null,
   modalType: "create",
}

// create the itemsStoreSlice with createSlice:
export const brandsStoreSlice = createSlice({
   name: "brandsStore",
   initialState: initialBrandsState,
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
      setBrands: (state, action: PayloadAction<BrandDto[]>) => {
         state.error = null
         state.brands = action.payload || []
         state.loading = false
      },
      prepareForCreate: (state) => {
         state.openUpdateModal = true
         state.modalType = "create"
      },
      addBrand: (state, action: PayloadAction<BrandDto>) => {
         state.brands.push(action.payload)
      },
      prepareForUpdate: (state, action: PayloadAction<BrandDto>) => {
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
      updateBrand: (state, action: PayloadAction<BrandDto>) => {
         state.brands = state.brands.map((brand) =>
            brand.brandId === action.payload.brandId ? action.payload : brand,
         )
      },
      prepareForDelete: (state, action: PayloadAction<BrandDto>) => {
         state.singleModel = action.payload
         state.openDeleteModal = true
      },
      deleteBrand: (state, action: PayloadAction<number>) => {
         state.brands = state.brands.filter(
            (brand) => brand.brandId !== action.payload,
         )
      },
   },
})
