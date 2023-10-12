import { useSetAtom } from "jotai"
import { selectedTaxAtom } from "../../store/tax.atoms.ts"
import React, { useEffect } from "react"
import { Can } from "../../access-control.ts"
import TaxTopBarComponent from "../taxs/components/TaxTopBar.component.tsx"
import { Space } from "@mantine/core"
import { DataGridTaxComponent } from "../taxs/components/DataGridTax.component.tsx"
import DialogDeleteTaxComponent from "../taxs/components/DialogDeleteTax.component.tsx"

const TaxsView = () => {
   const setSingleTax = useSetAtom(selectedTaxAtom)

   useEffect(() => {
      setSingleTax({})
   }, [])

   return (
      <Can I="ViewTax" a="user">
         <TaxTopBarComponent />
         <Space h="sm" />
         <DataGridTaxComponent />
         <DialogDeleteTaxComponent />
      </Can>
   )
}

export default TaxsView
