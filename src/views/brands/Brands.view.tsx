import CustomBreadcrumbsComponent from "../../components/CustomBreadcrumbs.component.tsx"
import React from "react"
import { Group, Space } from "@mantine/core"
import { DataGridBrandComponent } from "./components/DataGridBrand.component.tsx"
import { Can } from "../../access-control.ts"

const routes = [
   { path: "/", title: "Inicio" },
   { path: "/brands", title: "Marcas" },
]
const BrandsView = () => {
   return (
      <Can I="ViewBrand" a="user">
         <Group position="apart">
            <CustomBreadcrumbsComponent routes={routes} />
         </Group>
         <Space h="sm" />
         <DataGridBrandComponent />
      </Can>
   )
}

export default BrandsView
