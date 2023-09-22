import React, { useEffect, useState } from "react"
import { Control, useWatch } from "react-hook-form"
import { TextInput } from "@mantine/core"
import { IFormInputsForCreateSaleInterface } from "../../../types/IFormInputsForCreateSale.interface.ts"

interface NetcostSaleDetailComponentProps {
   index: number | null
   control: Control<IFormInputsForCreateSaleInterface, any>
}

const NetcostSaleDetailComponent = ({
   index,
   control,
}: NetcostSaleDetailComponentProps) => {
   const [costCalculated, setCostCalculated] = useState("")
   const formValues = useWatch({
      name: `itemDetails`,
      control,
   })
   useEffect(() => {
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

      setCostCalculated(
         formValues[index]?.itemTaxMethod === "Exclusivo"
            ? itemCostFormatted.toFixed(2)
            : itemQtyFormatted === 0
            ? itemCostFormatted.toFixed(2)
            : Number(itemCostFormatted - itemTaxFormatted).toFixed(2),
      )
   }, [formValues])
   return (
      <TextInput readOnly value={costCalculated} variant="filled" miw={120} />
   )
}

export default NetcostSaleDetailComponent
