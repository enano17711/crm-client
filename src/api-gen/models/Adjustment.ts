import type { ItemAdjustment } from "./ItemAdjustment"

export type Adjustment = {
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
   adjustmentId?: number
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
    * @type string | undefined
    */
   note?: string
   /**
    * @type array | undefined
    */
   itemAdjustments?: ItemAdjustment[]
}
