import type { CreateItemOrderDto } from "./CreateItemOrderDto"

export type CreateOrderDto = {
   /**
    * @type string date-time
    */
   orderDate: Date
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
    * @type number double
    */
   totalDiscount: number
   /**
    * @type number double
    */
   totalTax: number
   /**
    * @type number double
    */
   totalCost: number
   /**
    * @type number double
    */
   orderTaxRate: number
   /**
    * @type number double
    */
   orderTax: number
   /**
    * @type number double
    */
   orderDiscount: number
   /**
    * @type number double
    */
   grandTotal: number
   /**
    * @type string
    */
   status: string
   /**
    * @type string | undefined
    */
   note?: string
   /**
    * @type integer int64
    */
   supplierId: number
   /**
    * @type array | undefined
    */
   itemOrders?: CreateItemOrderDto[]
}
