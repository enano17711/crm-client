import React, { useEffect, useState } from "react"
import { Control, useWatch } from "react-hook-form"
import { TextInput } from "@mantine/core"
import { IFormInputsForCreateOrderInterface } from "../../../types/IFormInputsForCreateOrder.interface.ts"

interface TaxItemDetailComponentProps {
   index: number | null
   control: Control<IFormInputsForCreateOrderInterface, any>
}

const TaxItemDetailComponent = ({
   index,
   control,
}: TaxItemDetailComponentProps) => {
   const [taxCalculated, setTaxCalculated] = useState("")
   const formValues = useWatch({
      name: `itemDetails`,
      control,
   })
   useEffect(() => {
      const itemQtyFormatted = Number(
         Number(formValues[index]?.quantity).toFixed(2),
      )
      const itemCostFormatted = Number(
         Number(formValues[index]?.itemCost).toFixed(2),
      )
      const itemTaxRateFormatted = Number(
         Number(formValues[index]?.itemTaxRate).toFixed(2),
      )
      const itemTaxFormatted = Number(
         Number(itemCostFormatted * (itemTaxRateFormatted / 100)).toFixed(2),
      )
      setTaxCalculated((itemQtyFormatted * itemTaxFormatted).toFixed(2))
   }, [formValues])
   return (
      <TextInput readOnly value={taxCalculated} variant="filled" miw={120} />
   )
}

export default TaxItemDetailComponent
