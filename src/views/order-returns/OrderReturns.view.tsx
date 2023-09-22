import { Group, Space } from "@mantine/core"
import DataGridOrderReturnsComponent from "./components/DataGridOrderReturns.component.tsx"
import { useAppStore } from "../../store"
import React, { useEffect } from "react"
import ModalCreateOrderReturnComponent from "./components/ModalCreateOrderReturn.component.tsx"
import CustomBreadcrumbsComponent from "../../components/CustomBreadcrumbs.component.tsx"

const routes = [
   { path: "/", title: "Inicio" },
   { path: "/order-returns", title: "Retornos de Compras" },
]

const OrderReturnsView = () => {
   return (
      <>
         <Group position="apart">
            <CustomBreadcrumbsComponent routes={routes} />
         </Group>
         <Space h="sm" />
         <DataGridOrderReturnsComponent />
         <ModalCreateOrderReturnComponent />
      </>
   )
}

export default OrderReturnsView
