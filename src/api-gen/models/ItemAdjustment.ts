import type { Item } from "./Item"
import type { ItemBatch } from "./ItemBatch"
import type { Adjustment } from "./Adjustment"

export type ItemAdjustment = {
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
   itemAdjustmentId?: number
   /**
    * @type number | undefined double
    */
   quantity?: number
   /**
    * @type string | undefined
    */
   action?: string
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
   adjustmentId?: number
   adjustment?: Adjustment
}
