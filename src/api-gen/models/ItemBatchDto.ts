import type { ItemDto } from "./ItemDto"
import type { ItemAdjustmentDto } from "./ItemAdjustmentDto"
import type { ItemOrderDto } from "./ItemOrderDto"
import type { ItemOrderReturnDto } from "./ItemOrderReturnDto"

export type ItemBatchDto = {
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
   item?: ItemDto
   /**
    * @type array | undefined
    */
   itemAdjustments?: ItemAdjustmentDto[]
   /**
    * @type array | undefined
    */
   itemOrders?: ItemOrderDto[]
   /**
    * @type array | undefined
    */
   itemOrderReturns?: ItemOrderReturnDto[]
}
