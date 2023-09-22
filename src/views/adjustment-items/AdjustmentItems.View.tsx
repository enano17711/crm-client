import CustomBreadcrumbsComponent from "../../components/CustomBreadcrumbs.component.tsx"
import React, { useEffect } from "react"
import { Button, Group, Space } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { DataGridAdjustmentComponent } from "./components/DataGridAdjustment.component.tsx"
import { useAppStore } from "../../store"
import { Link } from "react-router-dom"
import { Can } from "../../access-control.ts"

const routes = [
   { path: "/", title: "Inicio" },
   { path: "/adjustments", title: "Ajustes" },
]
const AdjustmentsView = () => {
   const { adjustmentsStore } = useAppStore()
   const { adjustments } = adjustmentsStore.getters

   useEffect(() => {
      if (adjustments.length === 0) {
         adjustmentsStore.actions.loadAdjustments()
      }
   }, [])

   return (
      <Can I="ViewAdjustment" a="user">
         <Group position="apart">
            <CustomBreadcrumbsComponent routes={routes} />
            <Link to="/create-adjustment">
               <Button leftIcon={<IconPlus size={20} />}>Crear Ajuste</Button>
            </Link>
         </Group>
         <Space h="sm" />
         <DataGridAdjustmentComponent dataSource={adjustments} />
      </Can>
   )
}

export default AdjustmentsView
