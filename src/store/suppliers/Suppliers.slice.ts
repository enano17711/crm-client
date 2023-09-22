import { SuppliersStateInterface } from "./models"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SupplierDto } from "../../api-services"

// create an object that represents our initial items state
const initialSuppliersState: SuppliersStateInterface = {
   openDeleteModal: false,
   openUpdateModal: false,
   error: null,
   loading: false,
   suppliers: [],
   singleModel: null,
   modalType: "create",
}

// create the itemsStoreSlice with createSlice:
export const suppliersStoreSlice = createSlice({
   name: "suppliersStore",
   initialState: initialSuppliersState,
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
      setSuppliers: (state, action: PayloadAction<SupplierDto[]>) => {
         state.error = null
         state.suppliers = action.payload || []
         state.loading = false
      },
      prepareForCreate: (state) => {
         state.openUpdateModal = true
         state.modalType = "create"
      },
      addSupplier: (state, action: PayloadAction<SupplierDto>) => {
         state.suppliers.push(action.payload)
      },
      prepareForUpdate: (state, action: PayloadAction<SupplierDto>) => {
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
      updateSupplier: (state, action: PayloadAction<SupplierDto>) => {
         state.suppliers = state.suppliers.map((supplier) =>
            supplier.supplierId === action.payload.supplierId
               ? action.payload
               : supplier,
         )
      },
      prepareForDelete: (state, action: PayloadAction<SupplierDto>) => {
         state.singleModel = action.payload
         state.openDeleteModal = true
      },
      deleteSupplier: (state, action: PayloadAction<number>) => {
         state.suppliers = state.suppliers.filter(
            (supplier) => supplier.supplierId !== action.payload,
         )
      },
   },
})
