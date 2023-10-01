export type CreateItemDto = {
   /**
    * @type string
    */
   name: string
   /**
    * @type string
    */
   code: string
   /**
    * @type number double
    */
   price: number
   /**
    * @type number double
    */
   cost: number
   /**
    * @type boolean
    */
   isBatched: boolean
   /**
    * @type string
    */
   taxCostMethod: string
   /**
    * @type string
    */
   taxPriceMethod: string
   /**
    * @type string | undefined
    */
   description?: string
   /**
    * @type array | undefined
    */
   categoryItems?: number[]
   /**
    * @type integer | undefined int64
    */
   taxCostId?: number
   /**
    * @type integer | undefined int64
    */
   taxPriceId?: number
   /**
    * @type integer | undefined int64
    */
   brandId?: number
   /**
    * @type integer int64
    */
   unitPriceId: number
   /**
    * @type integer int64
    */
   unitCostId: number
}
