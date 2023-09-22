import { BaseUnitsStoreInterface } from "../../baseUnits"
import { UnitsStoreInterface } from "../../units"
import { BrandsStoreInterface } from "../../brands"
import { TaxsStoreInterface } from "../../taxs"
import { SuppliersStoreInterface } from "../../suppliers"
import { CategoryItemsStoreInterface } from "../../category-items"
import { ItemsStoreInterface } from "../../items"
import { AdjustmentsStoreInterface } from "../../adjustment"
import { OrdersStoreInterface } from "../../orders"
import { RBACsStoreInterface } from "../../rbac"
import { OrderReturnsStoreInterface } from "../../order-returns"
import { SalesStoreInterface } from "../../sales"
import { CustomersStoreInterface } from "../../customers"

// additional domain store interfaces will be imported here as needed

/**
 * @name RootStoreInterface
 * @description Interface represents our root state manager (store)
 */

export interface RootStoreInterface {
   baseUnitsStore: BaseUnitsStoreInterface
   unitsStore: UnitsStoreInterface
   brandsStore: BrandsStoreInterface
   taxsStore: TaxsStoreInterface
   suppliersStore: SuppliersStoreInterface
   customersStore: CustomersStoreInterface
   categoryItemsStore: CategoryItemsStoreInterface
   itemsStore: ItemsStoreInterface
   adjustmentsStore: AdjustmentsStoreInterface
   ordersStore: OrdersStoreInterface
   orderReturnsStore: OrderReturnsStoreInterface
   salesStore: SalesStoreInterface
   rbacsStore: RBACsStoreInterface
   // additional domain store modules will be added here as needed
}
