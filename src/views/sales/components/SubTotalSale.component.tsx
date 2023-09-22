import React, { useEffect, useState } from "react"
import { Control, useWatch } from "react-hook-form"
import { TextInput } from "@mantine/core"
import { IFormInputsForCreateSaleInterface } from "../../../types/IFormInputsForCreateSale.interface.ts"

interface SubTotalSaleComponentProps {
   index: number | null
   control: Control<IFormInputsForCreateSaleInterface, any>
}

const SubTotalSaleComponent = ({
   index,
   control,
}: SubTotalSaleComponentProps) => {
   const [subTotal, setSubTotal] = useState("")
   const formValues = useWatch({
      name: `itemDetails`,
      control,
   })
   useEffect(() => {
      const itemDiscountFormatted = Number(
         Number(formValues[index]?.discount).toFixed(2),
      )
      const itemQtyFormatted = Number(
         Number(formValues[index]?.quantity).toFixed(2),
      )
      const itemCostFormatted = Number(
         Number(formValues[index]?.itemPrice).toFixed(2),
      )
      const itemTaxRateFormatted = Number(
         Number(formValues[index]?.itemTaxRate).toFixed(2),
      )
      const itemTaxFormatted = Number(
         Number(itemCostFormatted * (itemTaxRateFormatted / 100)).toFixed(2),
      )
      const calculatedTax = Number(
         Number(itemQtyFormatted * itemTaxFormatted).toFixed(2),
      )

      setSubTotal(
         formValues[index].itemTaxMethod === "Exclusivo"
            ? Number(
                 itemQtyFormatted * itemCostFormatted +
                    calculatedTax -
                    itemDiscountFormatted,
              ).toFixed(2)
            : Number(
                 itemQtyFormatted * itemCostFormatted - itemDiscountFormatted,
              ).toFixed(2),
      )
   }, [formValues])
   return <TextInput readOnly value={subTotal} variant="filled" miw={120} />
}

export default SubTotalSaleComponent
