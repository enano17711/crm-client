import type { Customer } from "./Customer"
import type { ItemSale } from "./ItemSale"

export type Sale = {
   /**
    * @type boolean | undefined
    */
   isDeleted?: boolean
   /**
    * @type string | undefined date-time
    */
   deletedAt?: Date
   /**
    * @type integer | undefined int64
    */
   deletedBy?: number
   /**
    * @type string | undefined date-time
    */
   createdAt?: Date
   /**
    * @type integer | undefined int64
    */
   createdBy?: number
   /**
    * @type string | undefined date-time
    */
   updatedAt?: Date
   /**
    * @type integer | undefined int64
    */
   updatedBy?: number
   /**
    * @type integer | undefined int64
    */
   saleId?: number
   /**
    * @type string | undefined
    */
   referenceNumber?: string
   /**
    * @type number | undefined double
    */
   itemsCount?: number
   /**
    * @type number | undefined double
    */
   totalQuantity?: number
   /**
    * @type number | undefined double
    */
   totalDiscount?: number
   /**
    * @type number | undefined double
    */
   totalTax?: number
   /**
    * @type number | undefined double
    */
   totalCost?: number
   /**
    * @type number | undefined double
    */
   orderTaxRate?: number
   /**
    * @type number | undefined double
    */
   orderTax?: number
   /**
    * @type number | undefined double
    */
   orderDiscount?: number
   /**
    * @type number | undefined double
    */
   grandTotal?: number
   /**
    * @type string | undefined
    */
   status?: string
   /**
    * @type string | undefined
    */
   note?: string
   /**
    * @type integer | undefined int64
    */
   customerId?: number
   customer?: Customer
   /**
    * @type array | undefined
    */
   itemSales?: ItemSale[]
}
