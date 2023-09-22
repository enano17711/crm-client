import CustomBreadcrumbsComponent from "../../components/CustomBreadcrumbs.component.tsx"
import React, { useEffect } from "react"
import { Button, Group, Space } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { ModalCreateCategoryItemComponent } from "./components/ModalCreateCategoryItem.component.tsx"
import { useAppStore } from "../../store"
import DialogDeleteCategoryItemComponent from "./components/DialogDeleteCategoryItem.component.tsx"
import { DataGridCategoryItemComponent } from "./components/DataGridCategoryItem.component.tsx"

const routes = [
   { path: "/", title: "Inicio" },
   { path: "/categoryItems", title: "Categorias de Items" },
]
const CategoryItemsView = () => {
   const { categoryItemsStore } = useAppStore()
   const { categoryItems } = categoryItemsStore.getters

   useEffect(() => {
      if (categoryItems.length === 0) {
         categoryItemsStore.actions.loadCategoryItems()
      }
   }, [])

   return (
      <>
         <Group position="apart">
            <CustomBreadcrumbsComponent routes={routes} />
            <Button
               leftIcon={<IconPlus size={20} />}
               onClick={() => categoryItemsStore.actions.prepareForCreate()}
            >
               Crear Categoría de Items
            </Button>
         </Group>
         <Space h="sm" />
         <DataGridCategoryItemComponent dataSource={categoryItems} />
         <ModalCreateCategoryItemComponent />
         <DialogDeleteCategoryItemComponent />
      </>
   )
}

export default CategoryItemsView
