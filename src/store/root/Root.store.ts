import { configureStore } from "@reduxjs/toolkit"
import {
   baseUnitsStoreSlice,
   useBaseUnitsActions,
   useBaseUnitsGetters,
} from "../baseUnits"
import { useDispatch } from "react-redux"
import { RootStoreInterface } from "./models"
import { unitsStoreSlice, useUnitsActions, useUnitsGetters } from "../units"
import { brandsStoreSlice, useBrandsActions, useBrandsGetters } from "../brands"
import { taxsStoreSlice, useTaxsActions, useTaxsGetters } from "../taxs"
import {
   suppliersStoreSlice,
   useSuppliersActions,
   useSuppliersGetters,
} from "../suppliers"
import {
   categoryItemsStoreSlice,
   useCategoryItemsActions,
   useCategoryItemsGetters,
} from "../category-items"
import { itemsStoreSlice, useItemsActions, useItemsGetters } from "../items"
import {
   adjustmentsStoreSlice,
   useAdjustmentsActions,
   useAdjustmentsGetters,
} from "../adjustment"
import { ordersStoreSlice, useOrdersActions, useOrdersGetters } from "../orders"
import { rbacsStoreSlice } from "../rbac"
import { useRBACsActions, useRBACsGetters } from "../rbac"
import {
   orderReturnsStoreSlice,
   useOrderReturnsActions,
   useOrderReturnsGetters,
} from "../order-returns"
import { salesStoreSlice, useSalesActions, useSalesGetters } from "../sales"
import {
   customersStoreSlice,
   useCustomersActions,
   useCustomersGetters,
} from "../customers"

// configure root redux store for the whole app.
// this will be consumed by App.tsx
export const rootStore = configureStore({
   reducer: {
      // add reducers here
      baseUnitsState: baseUnitsStoreSlice.reducer,
      unitsState: unitsStoreSlice.reducer,
      brandsState: brandsStoreSlice.reducer,
      taxsState: taxsStoreSlice.reducer,
      suppliersState: suppliersStoreSlice.reducer,
      customersState: customersStoreSlice.reducer,
      categoryItemsState: categoryItemsStoreSlice.reducer,
      itemsState: itemsStoreSlice.reducer,
      adjustmentsState: adjustmentsStoreSlice.reducer,
      ordersState: ordersStoreSlice.reducer,
      orderReturnsState: orderReturnsStoreSlice.reducer,
      salesState: salesStoreSlice.reducer,
      rbacsState: rbacsStoreSlice.reducer,
      // keep adding more domain-specific reducers here as needed
   },
})

// Infer the `RootStateInterface` type from the store itself (rootStore.getState)
// thus avoiding to explicitly having to create an additional interface for the
export type RootStateInterface = ReturnType<typeof rootStore.getState>

// hook that returns our root store instance and will allow us to consume our app store from our components
export function useAppStore(): RootStoreInterface {
   // note: we are calling dispatch "commit" here, as it make more sense to call it this way
   // feel free to just call it dispatch if you prefer
   const commit = useDispatch()
   return {
      baseUnitsStore: {
         actions: useBaseUnitsActions(commit),
         getters: useBaseUnitsGetters(),
      },
      unitsStore: {
         actions: useUnitsActions(commit),
         getters: useUnitsGetters(),
      },
      brandsStore: {
         actions: useBrandsActions(commit),
         getters: useBrandsGetters(),
      },
      taxsStore: {
         actions: useTaxsActions(commit),
         getters: useTaxsGetters(),
      },
      suppliersStore: {
         actions: useSuppliersActions(commit),
         getters: useSuppliersGetters(),
      },
      customersStore: {
         actions: useCustomersActions(commit),
         getters: useCustomersGetters(),
      },
      categoryItemsStore: {
         actions: useCategoryItemsActions(commit),
         getters: useCategoryItemsGetters(),
      },
      itemsStore: {
         actions: useItemsActions(commit),
         getters: useItemsGetters(),
      },
      adjustmentsStore: {
         actions: useAdjustmentsActions(commit),
         getters: useAdjustmentsGetters(),
      },
      ordersStore: {
         actions: useOrdersActions(commit),
         getters: useOrdersGetters(),
      },
      orderReturnsStore: {
         actions: useOrderReturnsActions(commit),
         getters: useOrderReturnsGetters(),
      },
      salesStore: {
         actions: useSalesActions(commit),
         getters: useSalesGetters(),
      },
      rbacsStore: {
         actions: useRBACsActions(commit),
         getters: useRBACsGetters(),
      },
      // additional domain store modules will be added here as needed
   }
}

// infer the type of the entire app state
type IAppState = ReturnType<typeof rootStore.getState>

/**
 * @name getAppState
 * @description
 * Returns a snapshot of the current app state (non-reactive)
 * This will be used mainly across store modules (i.e. items/etc.)
 * In components, we'll usually use getters, not this.
 * @returns
 */
export function getAppState(): IAppState {
   const appState = rootStore.getState()
   return {
      ...appState,
   }
}
