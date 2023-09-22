import { BaseUnitsStateInterface } from "./models"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BaseUnitDto } from "../../api-services"

// create an object that represents our initial items state
const initialBaseUnitsState: BaseUnitsStateInterface = {
   openDeleteModal: false,
   openUpdateModal: false,
   error: null,
   loading: false,
   baseUnits: [],
   singleModel: null,
   modalType: "create",
}

// create the itemsStoreSlice with createSlice:
export const baseUnitsStoreSlice = createSlice({
   name: "baseUnitsStore",
   initialState: initialBaseUnitsState,
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
      setBaseUnits: (state, action: PayloadAction<BaseUnitDto[]>) => {
         state.error = null
         state.baseUnits = action.payload || []
         state.loading = false
      },
      prepareForCreate: (state) => {
         state.openUpdateModal = true
         state.modalType = "create"
      },
      addBaseUnit: (state, action: PayloadAction<BaseUnitDto>) => {
         state.baseUnits.push(action.payload)
      },
      prepareForUpdate: (state, action: PayloadAction<BaseUnitDto>) => {
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
      updateBaseUnit: (state, action: PayloadAction<BaseUnitDto>) => {
         state.baseUnits = state.baseUnits.map((baseUnit) =>
            baseUnit.baseUnitId === action.payload.baseUnitId
               ? action.payload
               : baseUnit,
         )
      },
      prepareForDelete: (state, action: PayloadAction<BaseUnitDto>) => {
         state.singleModel = action.payload
         state.openDeleteModal = true
      },
      deleteBaseUnit: (state, action: PayloadAction<number>) => {
         state.baseUnits = state.baseUnits.filter(
            (baseUnit) => baseUnit.baseUnitId !== action.payload,
         )
      },
   },
})
