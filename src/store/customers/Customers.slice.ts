import { CustomersStateInterface } from "./models"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CustomerDto } from "../../api-services"

const initialCustomersState: CustomersStateInterface = {
   openDeleteModal: false,
   openUpdateModal: false,
   error: null,
   loading: false,
   customers: [],
   singleModel: null,
   modalType: "create",
}

export const customersStoreSlice = createSlice({
   name: "customersStore",
   initialState: initialCustomersState,
   reducers: {
      setLoading: (state, action: PayloadAction<boolean>) => {
         state.loading = action.payload
      },
      setError: (state, action: PayloadAction<string>) => {
         state.error = action.payload
         state.loading = false
      },
      setCustomers: (state, action: PayloadAction<CustomerDto[]>) => {
         state.error = null
         state.customers = action.payload || []
         state.loading = false
      },
      prepareForCreate: (state) => {
         state.openUpdateModal = true
         state.modalType = "create"
      },
      addCustomer: (state, action: PayloadAction<CustomerDto>) => {
         state.customers.push(action.payload)
      },
      prepareForUpdate: (state, action: PayloadAction<CustomerDto>) => {
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
      updateCustomer: (state, action: PayloadAction<CustomerDto>) => {
         state.customers = state.customers.map((customer) =>
            customer.customerId === action.payload.customerId
               ? action.payload
               : customer,
         )
      },
      prepareForDelete: (state, action: PayloadAction<CustomerDto>) => {
         state.singleModel = action.payload
         state.openDeleteModal = true
      },
      deleteCustomer: (state, action: PayloadAction<number>) => {
         state.customers = state.customers.filter(
            (customer) => customer.customerId !== action.payload,
         )
      },
   },
})
