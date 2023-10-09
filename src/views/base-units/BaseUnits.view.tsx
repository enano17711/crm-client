import React, { useEffect } from "react"
import { Space } from "@mantine/core"
import { useSetAtom } from "jotai/index"
import { selectedBaseUnitAtom } from "../../store/baseUnit.atoms.ts"
import { Can } from "../../access-control.ts"
import BaseUnitTopBarComponent from "./components/BaseUnitTopBar.component.tsx"
import DataGridBaseUnitComponent from "./components/DataGridBaseUnit.component.tsx"
import DialogDeleteBaseUnitComponent from "./components/DialogDeleteBaseUnit.component.tsx"

const routes = [
   { path: "/", title: "Inicio" },
   { path: "/unitBase", title: "Unidades Base" },
]
const BaseUnitsView = () => {
   const setSingleBaseUnit = useSetAtom(selectedBaseUnitAtom)

   useEffect(() => {
      setSingleBaseUnit({})
   }, [])

   return (
      <Can I="ViewBrand" a="user">
         <BaseUnitTopBarComponent />
         <Space h="sm" />
         <DataGridBaseUnitComponent />
         <DialogDeleteBaseUnitComponent />
      </Can>
   )
}

export default BaseUnitsView
