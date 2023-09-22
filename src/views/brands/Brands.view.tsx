import CustomBreadcrumbsComponent from "../../components/CustomBreadcrumbs.component.tsx"
import React, { useEffect } from "react"
import { Button, Group, Space } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { ModalCreateBrandComponent } from "./components/ModalCreateBrand.component.tsx"
import { DataGridBrandComponent } from "./components/DataGridBrand.component.tsx"
import { useAppStore } from "../../store"
import DialogDeleteBrandComponent from "./components/DialogDeleteBrand.component.tsx"
import { Can } from "../../access-control.ts"

const routes = [
   { path: "/", title: "Inicio" },
   { path: "/brands", title: "Marcas" },
]
const BrandsView = () => {
   const { brandsStore } = useAppStore()
   const { brands } = brandsStore.getters

   useEffect(() => {
      if (brands.length === 0) {
         brandsStore.actions.loadBrands()
      }
   }, [])

   return (
      <Can I="ViewBrand" a="user">
         <Group position="apart">
            <CustomBreadcrumbsComponent routes={routes} />
            <Button
               leftIcon={<IconPlus size={20} />}
               onClick={() => brandsStore.actions.prepareForCreate()}
            >
               Crear Marca
            </Button>
         </Group>
         <Space h="sm" />
         <DataGridBrandComponent dataSource={brands} />
         <ModalCreateBrandComponent />
         <DialogDeleteBrandComponent />
      </Can>
   )
}

export default BrandsView
