import type { ItemDto } from "./ItemDto"
import type { ItemBatchDto } from "./ItemBatchDto"
import type { AdjustmentDto } from "./AdjustmentDto"

export type ItemAdjustmentDto = {
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
   item?: ItemDto
   itemBatch?: ItemBatchDto
   adjustment?: AdjustmentDto
}
