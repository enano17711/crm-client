import React, { useEffect } from "react"
import { Space, Tabs } from "@mantine/core"
import UnitTopBarComponent from "../../units/components/UnitTopBar.component.tsx"
import { DataGridUnitComponent } from "../../units/components/DataGridUnit.component.tsx"
import DialogDeleteUnitComponent from "../../units/components/DialogDeleteUnit.component.tsx"
import { useAtomValue, useSetAtom } from "jotai"
import {
   selectedUnitAtom,
   unitGridParametersAtom,
} from "../../../store/unit.atoms.ts"
import { selectedBaseUnitAtom } from "../../../store/baseUnit.atoms.ts"

const TabUnitsFromBaseUnitComponent = () => {
   const setSingleUnit = useSetAtom(selectedUnitAtom)
   const singleBaseUnit = useAtomValue(selectedBaseUnitAtom)

   const setUnitGridParameters = useSetAtom(unitGridParametersAtom)

   useEffect(() => {
      setSingleUnit({})
      setUnitGridParameters((prev) => {
         return {
            ...prev,
            pageIndex: 1,
            searchColumn: "BaseUnitId",
            searchText: singleBaseUnit.baseUnitId.toString(),
            orderBy: "BaseUnitId",
            orderDirection: "asc",
         }
      })
   }, [])

   return (
      <Tabs.Panel value="first">
         <Space h="sm" />
         <UnitTopBarComponent showSearchAction={false} />
         <Space h="sm" />
         <DataGridUnitComponent />
         <DialogDeleteUnitComponent />
      </Tabs.Panel>
   )
}

export default TabUnitsFromBaseUnitComponent
