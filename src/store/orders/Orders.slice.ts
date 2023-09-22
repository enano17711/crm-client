import { OrdersStateInterface } from "./models"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BrandDto, ItemOrderDto, OrderDto } from "../../api-services"
import { getAppState } from "../root"

// create an object that represents our initial items state
const initialOrdersState: OrdersStateInterface = {
   openUpdateModal: false,
   error: null,
   loading: false,
   orders: [],
   singleModel: null,
   openStatusModal: false,
}

// create the itemsStoreSlice with createSlice:
export const ordersStoreSlice = createSlice({
   name: "ordersStore",
   initialState: initialOrdersState,
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
      setOrders: (state, action: PayloadAction<OrderDto[]>) => {
         state.error = null
         state.orders = action.payload || []
         state.loading = false
      },
      addOrder: (state, action: PayloadAction<OrderDto>) => {
         state.orders.push(action.payload)
      },
      prepareForUpdate: (state, action: PayloadAction<ItemOrderDto>) => {
         state.singleModel = action.payload
         state.openUpdateModal = true
      },
      updateItemOrder: (state, action: PayloadAction<ItemOrderDto>) => {
         /*state.orders = state.brands.map((brand) =>
            brand.brandId === action.payload.brandId ? action.payload : brand,
         )*/
      },
      prepareForStatus: (state, action: PayloadAction<ItemOrderDto>) => {
         state.singleModel = action.payload
         state.openStatusModal = true
      },
      disposeState: (state) => {
         state.error = null
         state.loading = false
         state.openUpdateModal = false
         state.singleModel = null
         state.openStatusModal = false
      },
   },
})
