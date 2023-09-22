import React, { useEffect, useState } from "react"
import { Control, useWatch } from "react-hook-form"
import { IFormInputsForCreateOrderInterface } from "../../../types/IFormInputsForCreateOrder.interface.ts"

interface TotalOrderItemDetailsComponentProps {
   control: Control<IFormInputsForCreateOrderInterface, any>
}

const TotalOrderItemDetailsComponent = ({
   control,
}: TotalOrderItemDetailsComponentProps) => {
   const [totals, setTotals] = useState({
      totalItems: 0,
      totalQty: 0,
      totalReceivedQty: 0,
      totalCost: 0,
      totalDiscount: 0,
      totalTax: 0,
      totalSubTotal: 0,
   })
   const formValues = useWatch({
      name: `itemDetails`,
      control,
   })
   const watchStatus = useWatch({
      name: "status",
      control,
   })

   useEffect(() => {
      const totalItems = formValues.length
      const totalQty = Number(
         Number(
            formValues.reduce((acc, curr) => {
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

      const totalReceivedQty = Number(
         Number(
            formValues.reduce((acc, curr) => {
               if (
                  curr.receivedQuantity === null ||
                  curr.receivedQuantity === undefined ||
                  typeof curr.receivedQuantity === "string"
               ) {
                  curr.receivedQuantity = 0
               }
               return Number(Number(acc + curr.receivedQuantity).toFixed(2))
            }, 0),
         ).toFixed(2),
      )

      const totalDiscount = Number(
         Number(
            formValues.reduce((acc, curr) => {
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
      const taxesCalculated = formValues.map((item) => {
         const itemQtyFormatted = Number(Number(item.quantity).toFixed(2))
         const itemCostFormatted = Number(Number(item.itemCost).toFixed(2))
         const itemTaxRateFormatted = Number(
            Number(item.itemTaxRate).toFixed(2),
         )
         const itemTaxFormatted = Number(
            Number(itemCostFormatted * (itemTaxRateFormatted / 100)).toFixed(2),
         )
         return Number(Number(itemQtyFormatted * itemTaxFormatted).toFixed(2))
      })
      const totalTax = Number(
         Number(
            taxesCalculated.reduce((acc, curr) => {
               return Number(Number(acc + curr).toFixed(2))
            }, 0),
         ).toFixed(2),
      )
      const costsCalculated = formValues.map((item) => {
         const itemTaxMethod = item.itemTaxMethod
         const itemQtyFormatted = Number(Number(item.quantity).toFixed(2))
         const itemCostFormatted = Number(Number(item.itemCost).toFixed(2))
         const itemTaxRateFormatted = Number(
            Number(item.itemTaxRate).toFixed(2),
         )
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
      const totalCost = Number(
         Number(costsCalculated.reduce((acc, curr) => acc + curr, 0)).toFixed(
            2,
         ),
      )
      const subTotalsCalculated = formValues.map((item) => {
         const itemDiscountFormatted = Number(Number(item?.discount).toFixed(2))
         const itemQtyFormatted = Number(Number(item?.quantity).toFixed(2))
         const itemCostFormatted = Number(Number(item?.itemCost).toFixed(2))
         const itemTaxRateFormatted = Number(
            Number(item?.itemTaxRate).toFixed(2),
         )
         const itemTaxFormatted = Number(
            Number(itemCostFormatted * (itemTaxRateFormatted / 100)).toFixed(2),
         )
         const calculatedTax = Number(
            Number(itemQtyFormatted * itemTaxFormatted).toFixed(2),
         )
         return item.itemTaxMethod === "Exclusivo"
            ? Number(
                 itemQtyFormatted * itemCostFormatted +
                    calculatedTax -
                    itemDiscountFormatted,
              ).toFixed(2)
            : Number(
                 itemQtyFormatted * itemCostFormatted - itemDiscountFormatted,
              ).toFixed(2)
      })

      const totalSubTotal = Number(
         Number(
            subTotalsCalculated.reduce((acc, curr) => acc + Number(curr), 0),
         ).toFixed(2),
      )
      setTotals({
         totalItems,
         totalQty,
         totalReceivedQty,
         totalCost,
         totalDiscount,
         totalTax,
         totalSubTotal,
      })
   }, [formValues])
   return (
      <tr>
         <th>Totals: {totals.totalItems}</th>
         <th></th>
         <th></th>
         <th></th>
         <th>{totals.totalQty.toFixed(2)}</th>
         <th
            style={{
               display: watchStatus !== "Partial" ? "none" : "",
            }}
         >
            {totals.totalReceivedQty.toFixed(2)}
         </th>
         <th>{totals.totalCost.toFixed(2)}</th>
         <th>{totals.totalTax.toFixed(2)}</th>
         <th>{totals.totalDiscount.toFixed(2)}</th>
         <th>{totals.totalSubTotal.toFixed(2)}</th>
      </tr>
   )
}

export default TotalOrderItemDetailsComponent
