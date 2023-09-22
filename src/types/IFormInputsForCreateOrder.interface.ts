export interface IFormInputsForCreateOrderInterface {
   orderDate: Date
   orderTaxRate: number
   orderDiscount: number
   status: string
   note: string
   supplierId: string
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
      itemCost?: string
      itemPrice?: string
      itemCostId?: number
      itemPriceId: number
      itemTaxRate?: string
      itemCode?: string
      itemTaxMethod?: string
   }[]
}
