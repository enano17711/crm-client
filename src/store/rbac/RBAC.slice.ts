import { RBACStateInterface } from "./models"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { LoginOutput, SecurityDto } from "../../api-services"

// create an object that represents our initial items state
const initialRBACsState: RBACStateInterface = {
   error: null,
   loading: false,
   account: null,
   securities: [],
}

// create the itemsStoreSlice with createSlice:
export const rbacsStoreSlice = createSlice({
   name: "rbacsStore",
   initialState: initialRBACsState,
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
      setAccount: (state, action: PayloadAction<LoginOutput>) => {
         state.error = null
         state.account = action.payload
         state.loading = false
      },
      setSecurities: (state, action: PayloadAction<SecurityDto[]>) => {
         state.error = null
         state.securities = action.payload
         state.loading = false
      },
      disposeState: (state) => {
         state.error = null
         state.loading = false
         state.account = null
      },
   },
})
