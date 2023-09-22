import { ItemsStateInterface } from "./models"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ItemBatchDto, ItemDto } from "../../api-services"

// create an object that represents our initial items state
const initialItemsState: ItemsStateInterface = {
   openCreateItemBatchModal: false,
   openDeleteItemBatchModal: false,
   openDeleteModal: false,
   openUpdateModal: false,
   error: null,
   loading: false,
   items: [],
   singleModel: null,
   singleModelBatch: null,
   modalType: "create",
   itemIdForBatch: null,
}

// create the itemsStoreSlice with createSlice:
export const itemsStoreSlice = createSlice({
   name: "itemsStore",
   initialState: initialItemsState,
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
      setItems: (state, action: PayloadAction<ItemDto[]>) => {
         state.error = null
         state.items = action.payload || []
         state.loading = false
      },
      prepareForCreate: (state) => {
         state.openUpdateModal = true
         state.modalType = "create"
      },
      addItem: (state, action: PayloadAction<ItemDto>) => {
         state.items.push(action.payload)
      },
      prepareForCreateBatch: (state) => {
         state.openCreateItemBatchModal = true
      },
      addItemBatch: (
         state,
         action: PayloadAction<{ ItemBatchDto: ItemBatchDto; itemId: number }>,
      ) => {
         state.items = state.items.map((item) => {
            if (item.itemId === action.payload.itemId) {
               return {
                  ...item,
                  itemBatches: [
                     ...item.itemBatches,
                     action.payload.ItemBatchDto,
                  ],
               }
            }
            return item
         })
      },
      prepareForUpdate: (state, action: PayloadAction<ItemDto>) => {
         state.singleModel = action.payload
         state.modalType = "update"
         state.openUpdateModal = true
      },
      disposeState: (state) => {
         state.openUpdateModal = false
         state.openDeleteModal = false
         state.openCreateItemBatchModal = false
         state.openDeleteItemBatchModal = false
         state.error = null
         state.loading = false
         state.singleModel = null
         state.singleModelBatch = null
         state.modalType = "create"
      },
      updateItem: (state, action: PayloadAction<ItemDto>) => {
         state.items = state.items.map((item) =>
            item.itemId === action.payload.itemId ? action.payload : item,
         )
      },
      prepareForDelete: (state, action: PayloadAction<ItemDto>) => {
         state.singleModel = action.payload
         state.openDeleteModal = true
      },
      deleteItem: (state, action: PayloadAction<number>) => {
         state.items = state.items.filter(
            (item) => item.itemId !== action.payload,
         )
      },
      prepareForDeleteBatch: (state, action: PayloadAction<ItemBatchDto>) => {
         state.singleModelBatch = action.payload
         state.openDeleteItemBatchModal = true
      },
      deleteItemBatch: (
         state,
         action: PayloadAction<{ itemId: number; itemBatchId: number }>,
      ) => {
         const { itemId, itemBatchId } = action.payload
         state.items = state.items.map((item) => {
            if (item.itemId === itemId) {
               return {
                  ...item,
                  itemBatches: item.itemBatches.filter(
                     (itemBatch) => itemBatch.itemBatchId !== itemBatchId,
                  ),
               }
            }
            return item
         })
      },
      /*      updateQuantityFromAdjustment: (
         state,
         action: PayloadAction<{
            itemId: number
            itemBatchId?: number | null
            quantity: number
            operation: string
         }>,
      ) => {
         state.items = state.items.map((item) => {
            if (item.itemId === action.payload.itemId) {
               if (
                  action.payload.itemBatchId !== null ||
                  action.payload.itemBatchId !== undefined
               ) {
                  return {
                     ...item,
                     itemBatches: item.itemBatches.map((itemBatch) => {
                        if (
                           itemBatch.itemBatchId === action.payload.itemBatchId
                        ) {
                           return {
                              ...itemBatch,
                              quantity:
                                 action.payload.operation === "Add"
                                    ? item.quantity + action.payload.quantity
                                    : item.quantity - action.payload.quantity,
                           }
                        } else {
                           return itemBatch
                        }
                     }),
                  }
               } else {
                  return {
                     ...item,
                     quantity:
                        action.payload.operation === "Add"
                           ? item.quantity + action.payload.quantity
                           : item.quantity - action.payload.quantity,
                  }
               }
            } else {
               return item
            }
         })
      },*/
      updateQuantityFromAdjustment: (
         state,
         action: PayloadAction<{
            itemId: number
            itemBatchId?: number | null
            quantity: number
            operation: string
         }>,
      ) => {
         state.items = state.items.map((item) => {
            if (item.itemId !== action.payload.itemId) return item

            if (
               action.payload.itemBatchId !== null &&
               action.payload.itemBatchId !== undefined
            ) {
               item.itemBatches = item.itemBatches.map((itemBatch) => {
                  if (itemBatch.itemBatchId !== action.payload.itemBatchId) {
                     return itemBatch
                  }

                  const updatedQuantity =
                     action.payload.operation === "Add"
                        ? itemBatch.quantity + action.payload.quantity
                        : itemBatch.quantity - action.payload.quantity

                  return {
                     ...itemBatch,
                     quantity: updatedQuantity,
                  }
               })
            } else {
               const updatedQuantity =
                  action.payload.operation === "Add"
                     ? item.quantity + action.payload.quantity
                     : item.quantity - action.payload.quantity

               return {
                  ...item,
                  quantity: updatedQuantity,
               }
            }

            return item
         })
      },
   },
})
