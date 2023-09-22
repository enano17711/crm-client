import { AdjustmentsStateInterface } from "./models"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AdjustmentDto } from "../../api-services"
import { getAppState } from "../root"

// create an object that represents our initial items state
const initialAdjustmentsState: AdjustmentsStateInterface = {
   error: null,
   loading: false,
   adjustments: [],
}

// create the itemsStoreSlice with createSlice:
export const adjustmentsStoreSlice = createSlice({
   name: "adjustmentsStore",
   initialState: initialAdjustmentsState,
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
      setAdjustments: (state, action: PayloadAction<AdjustmentDto[]>) => {
         state.error = null
         state.adjustments = action.payload || []
         state.loading = false
      },
      addAdjustment: (state, action: PayloadAction<AdjustmentDto>) => {
         state.adjustments.push(action.payload)
      },
      disposeState: (state) => {
         state.error = null
         state.loading = false
      },
   },
})
