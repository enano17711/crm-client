import { IFormInputsForCreateSaleInterface } from "../../../types/IFormInputsForCreateSale.interface.ts"
import { CreateItemSaleDto, ItemDto } from "../../../api-services"

export const totalQuantity = (data: IFormInputsForCreateSaleInterface) => {
   return Number(
      Number(
         data.itemDetails.reduce((acc, curr) => {
            if (
               curr.quantity === null ||
               curr.quantity === undefined ||
               typeof curr.quantity === "string"
            ) {
               curr.quantity = 0
            }
            return Number(Number(acc + curr.quantity).toFixed(2))
         }, 0),
      ).toFixed(2),
   )
}

export const totalDiscount = (data: IFormInputsForCreateSaleInterface) => {
   return Number(
      Number(
         data.itemDetails.reduce((acc, curr) => {
            if (
               curr.discount === null ||
               curr.discount === undefined ||
               typeof curr.discount === "string"
            ) {
               curr.discount = 0
            }
            return Number(Number(acc + curr.discount).toFixed(2))
         }, 0),
      ).toFixed(2),
   )
}

export const totalTax = (data: IFormInputsForCreateSaleInterface) => {
   const dataReduce = data.itemDetails.map((item) => {
      const itemQtyFormatted = Number(Number(item.quantity).toFixed(2))
      const itemCostFormatted = Number(Number(item.itemPrice).toFixed(2))
      const itemTaxRateFormatted = Number(Number(item.itemTaxRate).toFixed(2))
      const itemTaxFormatted = Number(
         Number(itemCostFormatted * (itemTaxRateFormatted / 100)).toFixed(2),
      )
      return Number(Number(itemQtyFormatted * itemTaxFormatted).toFixed(2))
   })

   return Number(
      Number(
         dataReduce.reduce((acc, curr) => {
            return Number(Number(acc + curr).toFixed(2))
         }, 0),
      ).toFixed(2),
   )
}

export const totalCost = (data: IFormInputsForCreateSaleInterface) => {
   const costsCalculated = data.itemDetails.map((item) => {
      const itemTaxMethod = item.itemTaxMethod
      const itemQtyFormatted = Number(Number(item.quantity).toFixed(2))
      const itemCostFormatted = Number(Number(item.itemPrice).toFixed(2))
      const itemTaxRateFormatted = Number(Number(item.itemTaxRate).toFixed(2))
      const itemTaxFormatted = Number(
         Number(itemCostFormatted * (itemTaxRateFormatted / 100)).toFixed(2),
      )
      const itemCostWithTaxInclusive = Number(
         Number(itemCostFormatted - itemTaxFormatted).toFixed(2),
      )
      return itemTaxMethod === "Exclusivo"
         ? Number(Number(itemQtyFormatted * itemCostFormatted).toFixed(2))
         : Number(
              Number(itemQtyFormatted * itemCostWithTaxInclusive).toFixed(2),
           )
   })

   return Number(
      Number(
         costsCalculated.reduce(
            (acc, curr) => Number(Number(acc + curr).toFixed(2)),
            0,
         ),
      ).toFixed(2),
   )
}
export const orderTax = (data: IFormInputsForCreateSaleInterface) => {
   return Number(
      Number(
         (totalCost(data) + totalTax(data) - totalDiscount(data)) *
            (data.orderTaxRate / 100),
      ).toFixed(2),
   )
}

export const grandTotal = (data: IFormInputsForCreateSaleInterface) => {
   return Number(
      Number(
         totalCost(data) +
            totalTax(data) -
            totalDiscount(data) +
            orderTax(data) -
            data.orderDiscount,
      ).toFixed(2),
   )
}

export const itemDetailsFormatted = (
   data: IFormInputsForCreateSaleInterface,
) => {
   const formattedItems: CreateItemSaleDto[] = data.itemDetails.map((item) => {
      const itemDiscountFormatted = Number(Number(item?.discount).toFixed(2))
      const itemQtyFormatted = Number(Number(item?.quantity).toFixed(2))
      const itemCostFormatted = Number(Number(item?.itemPrice).toFixed(2))
      const itemTaxRateFormatted = Number(Number(item?.itemTaxRate).toFixed(2))
      const itemTaxFormatted = Number(
         Number(itemCostFormatted * (itemTaxRateFormatted / 100)).toFixed(2),
      )
      const calculatedTax = Number(
         Number(itemQtyFormatted * itemTaxFormatted).toFixed(2),
      )

      let splitDate = null
      let dateFormatted = null
      let newDate = null
      if (item.itemBatchDate !== null && item.itemBatchDate !== undefined) {
         splitDate = item.itemBatchDate.split("/")
         dateFormatted = splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0]
         newDate = new Date(dateFormatted)
      }

      return {
         batchNumber: item.itemBatchNumber,
         batchDate: newDate,
         quantity: item.quantity,
         receivedQuantity: item.receivedQuantity,
         unitPriceNet: Number(item.itemPrice),
         discount: item.discount,
         taxRate: Number(Number(item.itemTaxRate).toFixed(2)),
         tax: calculatedTax,
         total:
            item.itemTaxMethod === "Exclusivo"
               ? Number(
                    Number(
                       itemQtyFormatted * itemCostFormatted +
                          calculatedTax -
                          itemDiscountFormatted,
                    ).toFixed(2),
                 )
               : Number(
                    Number(
                       itemQtyFormatted * itemCostFormatted -
                          itemDiscountFormatted,
                    ).toFixed(2),
                 ),
         itemId: item.itemId,
         itemBatchId: item.itemBatchId,
         unitPriceId: item.itemPriceId,
      }
   })
   return formattedItems
}

export const itemsFormatted = (items: ItemDto[]) => {
   return items.flatMap((item) => {
      let itemBatches = []
      if (item.itemBatches.length > 0) {
         itemBatches = item.itemBatches.map((itemBatch) => {
            const localDateBatch = new Date(itemBatch.batchDate)
            const label = `${item.name} - ${item.code} - ${itemBatch.batchNumber}`
            const value = `${itemBatch.itemBatchId.toString()}-${item.itemId.toString()}-${
               itemBatch.batchNumber
            }-${localDateBatch.toLocaleDateString("es-ES")}-${item.name}-${
               item.cost
            }-${item.tax.rate}-${item.code}-${
               item.isBatched === true ? "true" : "false"
            }-${item.taxMethod}-${item.unitCost.unitId.toString()}`
            return { label, value }
         })
      }
      const label = `${item.name} - ${item.code}`
      const value = `${item.itemId.toString()}-${item.name}-${item.code}-${
         item.cost
      }-${item.tax.rate}-${item.isBatched === true ? "true" : "false"}-${
         item.taxMethod
      }-${item.unitCost.unitId.toString()}`
      return [{ label, value }, ...itemBatches]
   })
}
