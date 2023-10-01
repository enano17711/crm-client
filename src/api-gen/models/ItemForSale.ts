import type { Order } from "./Order"
import type { Item } from "./Item"
import type { ItemBatch } from "./ItemBatch"
import type { Unit } from "./Unit"
import type { ItemOrder } from "./ItemOrder"
import type { ItemSale } from "./ItemSale"

export type ItemForSale = {
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
   itemForSaleId?: number
   /**
    * @type string | undefined
    */
   batchNumber?: string
   /**
    * @type string | undefined date-time
    */
   batchDate?: Date
   /**
    * @type number | undefined double
    */
   quantity?: number
   /**
    * @type number | undefined double
    */
   receivedQuantity?: number
   /**
    * @type number | undefined double
    */
   unitCostNet?: number
   /**
    * @type number | undefined double
    */
   unitPriceNet?: number
   /**
    * @type number | undefined double
    */
   discount?: number
   /**
    * @type number | undefined double
    */
   taxRate?: number
   /**
    * @type number | undefined double
    */
   tax?: number
   /**
    * @type number | undefined double
    */
   total?: number
   /**
    * @type integer | undefined int64
    */
   orderId?: number
   order?: Order
   /**
    * @type integer | undefined int64
    */
   itemId?: number
   item?: Item
   /**
    * @type integer | undefined int64
    */
   itemBatchId?: number
   itemBatch?: ItemBatch
   /**
    * @type integer | undefined int64
    */
   unitCostId?: number
   unitCost?: Unit
   /**
    * @type integer | undefined int64
    */
   unitPriceId?: number
   unitPrice?: Unit
   /**
    * @type integer | undefined int64
    */
   itemOrderId?: number
   itemOrder?: ItemOrder
   /**
    * @type array | undefined
    */
   itemSales?: ItemSale[]
}
