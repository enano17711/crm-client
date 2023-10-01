import type { Item } from "./Item"
import type { ItemAdjustment } from "./ItemAdjustment"
import type { ItemOrder } from "./ItemOrder"
import type { ItemOrderReturn } from "./ItemOrderReturn"

export type ItemBatch = {
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
   itemBatchId?: number
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
    * @type integer | undefined int64
    */
   itemId?: number
   item?: Item
   /**
    * @type array | undefined
    */
   itemAdjustments?: ItemAdjustment[]
   /**
    * @type array | undefined
    */
   itemOrders?: ItemOrder[]
   /**
    * @type array | undefined
    */
   itemOrderReturns?: ItemOrderReturn[]
}
