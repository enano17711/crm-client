import type { CategoryItem } from "./CategoryItem"
import type { Tax } from "./Tax"
import type { Brand } from "./Brand"
import type { Unit } from "./Unit"
import type { ItemBatch } from "./ItemBatch"
import type { ItemOrder } from "./ItemOrder"
import type { ItemOrderReturn } from "./ItemOrderReturn"
import type { ItemAdjustment } from "./ItemAdjustment"

export type Item = {
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
    * @type string | undefined
    */
   name?: string
   /**
    * @type string | undefined
    */
   description?: string
   /**
    * @type integer | undefined int64
    */
   itemId?: number
   /**
    * @type string | undefined
    */
   code?: string
   /**
    * @type number | undefined double
    */
   price?: number
   /**
    * @type number | undefined double
    */
   cost?: number
   /**
    * @type number | undefined double
    */
   quantity?: number
   /**
    * @type boolean | undefined
    */
   isBatched?: boolean
   /**
    * @type string | undefined
    */
   taxCostMethod?: string
   /**
    * @type string | undefined
    */
   taxPriceMethod?: string
   /**
    * @type array | undefined
    */
   categoryItems?: CategoryItem[]
   /**
    * @type integer | undefined int64
    */
   taxCostId?: number
   taxCost?: Tax
   /**
    * @type integer | undefined int64
    */
   taxPriceId?: number
   taxPrice?: Tax
   /**
    * @type integer | undefined int64
    */
   brandId?: number
   brand?: Brand
   /**
    * @type integer | undefined int64
    */
   unitPriceId?: number
   unitPrice?: Unit
   /**
    * @type integer | undefined int64
    */
   unitCostId?: number
   unitCost?: Unit
   /**
    * @type array | undefined
    */
   itemBatches?: ItemBatch[]
   /**
    * @type array | undefined
    */
   itemOrders?: ItemOrder[]
   /**
    * @type array | undefined
    */
   itemOrderReturns?: ItemOrderReturn[]
   /**
    * @type array | undefined
    */
   itemAdjustments?: ItemAdjustment[]
}
