import CustomBreadcrumbsComponent from "../../components/CustomBreadcrumbs.component.tsx"
import React, { useEffect } from "react"
import { Button, Group, Space } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { ModalCreateUnitComponent } from "./components/ModalCreateUnit.component.tsx"
import { useAppStore } from "../../store"
import DialogDeleteUnitComponent from "./components/DialogDeleteUnit.component.tsx"
import { DataGridUnitComponent } from "./components/DataGridUnit.component.tsx"
import { BaseUnitDto } from "../../api-services"

const routes = [
   { path: "/", title: "Inicio" },
   { path: "/units", title: "Unidades" },
]
const UnitsView = () => {
   const { unitsStore, baseUnitsStore } = useAppStore()
   const { units } = unitsStore.getters
   const { baseUnits } = baseUnitsStore.getters

   const openModalCreate = (event: React.MouseEvent<HTMLButtonElement>) => {
      unitsStore.actions.prepareForCreate()
   }

   useEffect(() => {
      if (units.length === 0) {
         unitsStore.actions.loadUnits()
      }
      if (baseUnits.length === 0) {
         baseUnitsStore.actions.loadBaseUnits()
      }
   }, [])

   return (
      <>
         <Group position="apart">
            <CustomBreadcrumbsComponent routes={routes} />
            <Button leftIcon={<IconPlus size={20} />} onClick={openModalCreate}>
               Crear Unidad
            </Button>
         </Group>
         <Space h="sm" />
         <DataGridUnitComponent dataSource={units} baseUnits={baseUnits} />
         <ModalCreateUnitComponent />
         <DialogDeleteUnitComponent />
      </>
   )
}

export default UnitsView
