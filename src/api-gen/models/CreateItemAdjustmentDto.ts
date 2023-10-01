export type CreateItemAdjustmentDto = {
   /**
    * @type number double
    */
   quantity: number
   /**
    * @type string
    */
   action: string
   /**
    * @type integer | undefined int64
    */
   itemId?: number
   /**
    * @type integer | undefined int64
    */
   itemBatchId?: number
   /**
    * @type integer | undefined int64
    */
   adjustmentId?: number
}
