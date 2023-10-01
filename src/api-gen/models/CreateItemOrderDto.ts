export type CreateItemOrderDto = {
   /**
    * @type string | undefined
    */
   batchNumber?: string
   /**
    * @type string | undefined date-time
    */
   batchDate?: Date
   /**
    * @type number double
    */
   quantity: number
   /**
    * @type number double
    */
   receivedQuantity: number
   /**
    * @type number double
    */
   unitCostNet: number
   /**
    * @type number double
    */
   unitPriceNet: number
   /**
    * @type number double
    */
   discount: number
   /**
    * @type number double
    */
   taxRate: number
   /**
    * @type number double
    */
   tax: number
   /**
    * @type number double
    */
   total: number
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
   orderId?: number
   /**
    * @type integer int64
    */
   unitCostId: number
   /**
    * @type integer int64
    */
   unitPriceId: number
}
