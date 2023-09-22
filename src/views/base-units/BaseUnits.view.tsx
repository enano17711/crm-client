import CustomBreadcrumbsComponent from "../../components/CustomBreadcrumbs.component.tsx"
import React, { useEffect } from "react"
import { Button, Group, Space } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { ModalCreateBaseUnitComponent } from "./components/ModalCreateBaseUnit.component.tsx"
import { useAppStore } from "../../store"
import DialogDeleteBaseUnitComponent from "./components/DialogDeleteBaseUnit.component.tsx"
import { DataGridBaseUnitComponent } from "./components/DataGridBaseUnit.component.tsx"

const routes = [
   { path: "/", title: "Inicio" },
   { path: "/unitBase", title: "Unidades Base" },
]
const BaseUnitsView = () => {
   const { baseUnitsStore } = useAppStore()
   const { baseUnits } = baseUnitsStore.getters

   const openModalCreate = (event: React.MouseEvent<HTMLButtonElement>) => {
      baseUnitsStore.actions.prepareForCreate()
   }

   useEffect(() => {
      if (baseUnits.length === 0) {
         baseUnitsStore.actions.loadBaseUnits()
      }
   }, [])

   return (
      <>
         <Group position="apart">
            <CustomBreadcrumbsComponent routes={routes} />
            <Button leftIcon={<IconPlus size={20} />} onClick={openModalCreate}>
               Crear Unidad Base
            </Button>
         </Group>
         <Space h="sm" />
         <DataGridBaseUnitComponent dataSource={baseUnits} />
         <ModalCreateBaseUnitComponent />
         <DialogDeleteBaseUnitComponent />
      </>
   )
}

export default BaseUnitsView
