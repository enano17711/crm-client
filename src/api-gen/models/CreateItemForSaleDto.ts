export type CreateItemForSaleDto = {
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
   /**
    * @type integer | undefined int64
    */
   itemOrderId?: number
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
   unitCostId?: number
   /**
    * @type integer | undefined int64
    */
   unitPriceId?: number
}
