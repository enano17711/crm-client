import CustomBreadcrumbsComponent from "../../components/CustomBreadcrumbs.component.tsx"
import React, { useEffect } from "react"
import { Button, Group, Space } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { useAppStore } from "../../store"
import { ModalCreateItemComponent } from "./components/ModalCreateItem.component.tsx"
import { DataGridItemComponent } from "./components/DataGridItem.component.tsx"
import DialogDeleteItemComponent from "./components/DialogDeleteItem.component.tsx"
import ModalCreateItemBatchComponent from "./components/ModalCreateItemBatch.component.tsx"
import DialogDeleteItemBatchComponent from "./components/DialogDeleteItemBatch.component.tsx"

const routes = [
   { path: "/", title: "Inicio" },
   { path: "/items", title: "Items" },
]
const ItemsView = () => {
   const { itemsStore } = useAppStore()
   const { items } = itemsStore.getters

   useEffect(() => {
      if (items.length === 0) {
         itemsStore.actions.loadItems()
      }
   }, [])

   return (
      <>
         <Group position="apart">
            <CustomBreadcrumbsComponent routes={routes} />
            <Group position="right">
               <Button
                  leftIcon={<IconPlus size={20} />}
                  onClick={() => itemsStore.actions.prepareForCreate()}
               >
                  Crear Item
               </Button>
               <Button
                  leftIcon={<IconPlus size={20} />}
                  onClick={() => itemsStore.actions.prepareForCreateBatch()}
               >
                  Crear Item Batch
               </Button>
            </Group>
         </Group>
         <Space h="sm" />
         <DataGridItemComponent dataSource={items} />
         <ModalCreateItemComponent />
         <DialogDeleteItemComponent />
         <ModalCreateItemBatchComponent />
         <DialogDeleteItemBatchComponent />
      </>
   )
}

export default ItemsView
