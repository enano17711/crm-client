import React, { useEffect } from "react"
import { useSetAtom } from "jotai"
import { selectedUnitAtom } from "../../store/unit.atoms.ts"
import { Can } from "../../access-control.ts"
import UnitTopBarComponent from "../units/components/UnitTopBar.component.tsx"
import { Space } from "@mantine/core"
import { DataGridUnitComponent } from "../units/components/DataGridUnit.component.tsx"
import DialogDeleteUnitComponent from "../units/components/DialogDeleteUnit.component.tsx"

const UnitsView = () => {
   const setSingleUnit = useSetAtom(selectedUnitAtom)

   useEffect(() => {
      setSingleUnit({})
   }, [])

   return (
      <Can I="ViewUnit" a="user">
         <UnitTopBarComponent />
         <Space h="sm" />
         <DataGridUnitComponent />
         <DialogDeleteUnitComponent />
      </Can>
   )
}

export default UnitsView
