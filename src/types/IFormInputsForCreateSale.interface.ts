export interface IFormInputsForCreateSaleInterface {
   orderTaxRate: number
   orderDiscount: number
   status: string
   note: string
   customerId: string
   itemDetails: {
      quantity: number
      receivedQuantity: number
      discount?: number
      itemId?: number | null
      itemName?: string
      isBatch?: boolean
      itemBatchId?: number | null
      itemBatchNumber?: string
      itemBatchDate?: string
      itemPrice?: string
      itemPriceId?: number
      itemTaxRate?: string
      itemCode?: string
      itemTaxMethod?: string
   }[]
}
