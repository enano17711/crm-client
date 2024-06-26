import React from "react"
import MainLayout from "./layouts/MainLayout.tsx"
import { Route, Routes } from "react-router-dom"
import LoginComponent from "./views/rbac/Login.component.tsx"
import ProtectedRouteComponent from "./components/ProtectedRoute.component.tsx"
import HomeView from "./views/home/Home.view.tsx"
import BaseUnitsView from "./views/base-units/BaseUnits.view.tsx"
import UnitsView from "./views/units/Units.view.tsx"
import BrandsView from "./views/brands/Brands.view.tsx"
import TaxsView from "./views/taxs/Taxs.view.tsx"
import SuppliersView from "./views/suppliers/Suppliers.view.tsx"
import CategoryItemsView from "./views/category-items/CategoryItems.view.tsx"
import ItemsView from "./views/items/Items.view.tsx"
import CreateAdjustmentItemView from "./views/adjustment-items/CreateAdjustmentItemView.tsx"
import AdjustmentItemsView from "./views/adjustment-items/AdjustmentItems.View.tsx"
import OrdersView from "./views/orders/Orders.view.tsx"
import CreateOrderView from "./views/orders/CreateOrder.view.tsx"
import { AbilityContext, getAbility } from "./access-control.ts"
import OrderReturnsView from "./views/order-returns/OrderReturns.view.tsx"
import CreateSaleView from "./views/sales/CreateSale.view.tsx"
import CustomersView from "./views/customers/Customers.view.tsx"
import SalesView from "./views/sales/Sales.view.tsx"
import CreateBrandView from "./views/brands/CreateBrand.view.tsx"
import UpdateBrandView from "./views/brands/UpdateBrand.view.tsx"
import { useAtomValue } from "jotai"
import { securitiesAtom } from "./store/rbac.atoms.ts"
import CreateBaseUnitView from "./views/base-units/CreateBaseUnit.view.tsx"
import UpdateBaseUnitView from "./views/base-units/UpdateBaseUnit.view.tsx"
import CreateUnitView from "./views/units/CreateUnit.view.tsx"
import UpdateUnitView from "./views/units/UpdateUnit.view.tsx"

const RoutesComponent = () => {
   const securitiesData = useAtomValue(securitiesAtom)
   const ability = getAbility(securitiesData)

   return (
      <AbilityContext.Provider value={ability}>
         <MainLayout>
            {/*<LoadingComponent />*/}
            <Routes>
               <Route path="/login" element={<LoginComponent />} />
               <Route
                  path="/"
                  element={
                     <ProtectedRouteComponent>
                        <HomeView />
                     </ProtectedRouteComponent>
                  }
               />
               <Route
                  path="/base-units"
                  element={
                     <ProtectedRouteComponent>
                        <BaseUnitsView />
                     </ProtectedRouteComponent>
                  }
               />
               <Route
                  path="/base-units/create"
                  element={
                     <ProtectedRouteComponent>
                        <CreateBaseUnitView />
                     </ProtectedRouteComponent>
                  }
               />
               <Route
                  path="/base-units/update/:baseUnitId"
                  element={
                     <ProtectedRouteComponent>
                        <UpdateBaseUnitView />
                     </ProtectedRouteComponent>
                  }
               />
               <Route
                  path="/units"
                  element={
                     <ProtectedRouteComponent>
                        <UnitsView />
                     </ProtectedRouteComponent>
                  }
               />
               <Route
                  path="/units/create"
                  element={
                     <ProtectedRouteComponent>
                        <CreateUnitView />
                     </ProtectedRouteComponent>
                  }
               />
               <Route
                  path="/units/update/:unitId"
                  element={
                     <ProtectedRouteComponent>
                        <UpdateUnitView />
                     </ProtectedRouteComponent>
                  }
               />
               <Route
                  path="/brands"
                  element={
                     <ProtectedRouteComponent>
                        <BrandsView />
                     </ProtectedRouteComponent>
                  }
               />
               <Route
                  path="/brands/create"
                  element={
                     <ProtectedRouteComponent>
                        <CreateBrandView />
                     </ProtectedRouteComponent>
                  }
               />
               <Route
                  path="/brands/update/:brandId"
                  element={
                     <ProtectedRouteComponent>
                        <UpdateBrandView />
                     </ProtectedRouteComponent>
                  }
               />
               <Route
                  path="/taxs"
                  element={
                     <ProtectedRouteComponent>
                        <TaxsView />
                     </ProtectedRouteComponent>
                  }
               />
               <Route
                  path="/suppliers"
                  element={
                     <ProtectedRouteComponent>
                        <SuppliersView />
                     </ProtectedRouteComponent>
                  }
               />
               <Route
                  path="/customers"
                  element={
                     <ProtectedRouteComponent>
                        <CustomersView />
                     </ProtectedRouteComponent>
                  }
               />
               <Route
                  path="/category-items"
                  element={
                     <ProtectedRouteComponent>
                        <CategoryItemsView />
                     </ProtectedRouteComponent>
                  }
               />
               <Route
                  path="/items"
                  element={
                     <ProtectedRouteComponent>
                        <ItemsView />
                     </ProtectedRouteComponent>
                  }
               />
               <Route
                  path="/create-adjustment"
                  element={
                     <ProtectedRouteComponent>
                        <CreateAdjustmentItemView />
                     </ProtectedRouteComponent>
                  }
               />
               <Route
                  path="/adjustments"
                  element={
                     <ProtectedRouteComponent>
                        <AdjustmentItemsView />
                     </ProtectedRouteComponent>
                  }
               />
               <Route
                  path="/orders"
                  element={
                     <ProtectedRouteComponent>
                        <OrdersView />
                     </ProtectedRouteComponent>
                  }
               />
               <Route
                  path="/create-order"
                  element={
                     <ProtectedRouteComponent>
                        <CreateOrderView />
                     </ProtectedRouteComponent>
                  }
               />
               <Route
                  path="/order-returns"
                  element={
                     <ProtectedRouteComponent>
                        <OrderReturnsView />
                     </ProtectedRouteComponent>
                  }
               />
               <Route
                  path="/sales"
                  element={
                     <ProtectedRouteComponent>
                        <SalesView />
                     </ProtectedRouteComponent>
                  }
               />
               <Route
                  path="/create-sale"
                  element={
                     <ProtectedRouteComponent>
                        <CreateSaleView />
                     </ProtectedRouteComponent>
                  }
               />
            </Routes>
         </MainLayout>
      </AbilityContext.Provider>
   )
}

export default RoutesComponent
