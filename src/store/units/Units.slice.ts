import { UnitsStateInterface } from "./models"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UnitDto } from "../../api-services"

// create an object that represents our initial items state
const initialUnitsState: UnitsStateInterface = {
   openDeleteModal: false,
   openUpdateModal: false,
   error: null,
   loading: false,
   units: [],
   singleModel: null,
   modalType: "create",
}

// create the itemsStoreSlice with createSlice:
export const unitsStoreSlice = createSlice({
   name: "unitsStore",
   initialState: initialUnitsState,
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
      setUnits: (state, action: PayloadAction<UnitDto[]>) => {
         state.error = null
         state.units = action.payload || []
         state.loading = false
      },
      prepareForCreate: (state) => {
         state.openUpdateModal = true
         state.modalType = "create"
      },
      addUnit: (state, action: PayloadAction<UnitDto>) => {
         state.units.push(action.payload)
      },
      prepareForUpdate: (state, action: PayloadAction<UnitDto>) => {
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
      updateUnit: (state, action: PayloadAction<UnitDto>) => {
         state.units = state.units.map((unit) =>
            unit.unitId === action.payload.unitId ? action.payload : unit,
         )
      },
      prepareForDelete: (state, action: PayloadAction<UnitDto>) => {
         state.singleModel = action.payload
         state.openDeleteModal = true
      },
      deleteUnit: (state, action: PayloadAction<number>) => {
         state.units = state.units.filter(
            (unit) => unit.unitId !== action.payload,
         )
      },
   },
})
