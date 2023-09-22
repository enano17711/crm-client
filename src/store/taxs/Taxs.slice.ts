import { TaxsStateInterface } from "./models"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TaxDto } from "../../api-services"

// create an object that represents our initial items state
const initialTaxsState: TaxsStateInterface = {
   openDeleteModal: false,
   openUpdateModal: false,
   error: null,
   loading: false,
   taxs: [],
   singleModel: null,
   modalType: "create",
}

// create the itemsStoreSlice with createSlice:
export const taxsStoreSlice = createSlice({
   name: "taxsStore",
   initialState: initialTaxsState,
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
      setTaxs: (state, action: PayloadAction<TaxDto[]>) => {
         state.error = null
         state.taxs = action.payload || []
         state.loading = false
      },
      prepareForCreate: (state) => {
         state.openUpdateModal = true
         state.modalType = "create"
      },
      addTax: (state, action: PayloadAction<TaxDto>) => {
         state.taxs.push(action.payload)
      },
      prepareForUpdate: (state, action: PayloadAction<TaxDto>) => {
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
      updateTax: (state, action: PayloadAction<TaxDto>) => {
         state.taxs = state.taxs.map((tax) =>
            tax.taxId === action.payload.taxId ? action.payload : tax,
         )
      },
      prepareForDelete: (state, action: PayloadAction<TaxDto>) => {
         state.singleModel = action.payload
         state.openDeleteModal = true
      },
      deleteTax: (state, action: PayloadAction<number>) => {
         state.taxs = state.taxs.filter((tax) => tax.taxId !== action.payload)
      },
   },
})
