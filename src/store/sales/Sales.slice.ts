import { SalesStateInterface } from "./models"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BrandDto, ItemSaleDto, SaleDto } from "../../api-services"

const initialSalesState: SalesStateInterface = {
   openUpdateModal: false,
   error: null,
   loading: false,
   sales: [],
   singleModel: null,
   openStatusModal: false,
}

export const salesStoreSlice = createSlice({
   name: "salesStore",
   initialState: initialSalesState,
   reducers: {
      setLoading: (state, action: PayloadAction<boolean>) => {
         state.loading = action.payload
      },
      setError: (state, action: PayloadAction<string>) => {
         state.error = action.payload
         state.loading = false
      },
      setSales: (state, action: PayloadAction<SaleDto[]>) => {
         state.error = null
         state.sales = action.payload || []
         state.loading = false
      },
      addSale: (state, action: PayloadAction<SaleDto>) => {
         state.sales.push(action.payload)
      },
      prepareForUpdate: (state, action: PayloadAction<ItemSaleDto>) => {
         state.singleModel = action.payload
         state.openUpdateModal = true
      },
      updateItemSale: (state, action: PayloadAction<ItemSaleDto>) => {
         /*state.sales = state.brands.map((brand) =>
            brand.brandId === action.payload.brandId ? action.payload : brand,
         )*/
      },
      prepareForStatus: (state, action: PayloadAction<ItemSaleDto>) => {
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
