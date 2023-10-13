import { useSetAtom } from "jotai"
import { selectedSupplierAtom } from "../../store/supplier.atoms.ts"
import React, { useEffect } from "react"
import { Can } from "../../access-control.ts"
import SupplierTopBarComponent from "../suppliers/components/SupplierTopBar.component.tsx"
import { Space } from "@mantine/core"
import { DataGridSupplierComponent } from "../suppliers/components/DataGridSupplier.component.tsx"
import DialogDeleteSupplierComponent from "../suppliers/components/DialogDeleteSupplier.component.tsx"

const SuppliersView = () => {
   const setSingleSupplier = useSetAtom(selectedSupplierAtom)

   useEffect(() => {
      setSingleSupplier({})
   }, [])

   return (
      <Can I="ViewSupplier" a="user">
         <SupplierTopBarComponent />
         <Space h="sm" />
         <DataGridSupplierComponent />
         <DialogDeleteSupplierComponent />
      </Can>
   )
}

export default SuppliersView
