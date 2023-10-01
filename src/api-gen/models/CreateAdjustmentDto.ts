import type { CreateItemAdjustmentDto } from "./CreateItemAdjustmentDto"

export type CreateAdjustmentDto = {
   /**
    * @type string
    */
   referenceNumber: string
   /**
    * @type number double
    */
   itemsCount: number
   /**
    * @type number double
    */
   totalQuantity: number
   /**
    * @type string | undefined
    */
   note?: string
   /**
    * @type array
    */
   itemAdjustments: CreateItemAdjustmentDto[]
}
