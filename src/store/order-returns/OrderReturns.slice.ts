import { OrderReturnsStateInterface } from "./models"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BrandDto, OrderReturnDto } from "../../api-services"

const initialOrderReturnsState: OrderReturnsStateInterface = {
   openUpdateModal: false,
   error: null,
   loading: false,
   orderReturns: [],
}

export const orderReturnsStoreSlice = createSlice({
   name: "orderReturnsStore",
   initialState: initialOrderReturnsState,
   reducers: {
      setLoading: (state, action: PayloadAction<boolean>) => {
         state.loading = action.payload
      },
      setError: (state, action: PayloadAction<string>) => {
         state.error = action.payload
         state.loading = false
      },
      setOrderReturns: (state, action: PayloadAction<OrderReturnDto[]>) => {
         state.error = null
         state.orderReturns = action.payload || []
         state.loading = false
      },
      prepareForCreate: (state) => {
         state.openUpdateModal = true
      },
      disposeState: (state) => {
         state.openUpdateModal = false
         state.error = null
         state.loading = false
      },
   },
})
