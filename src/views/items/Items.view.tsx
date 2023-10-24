import { useSetAtom } from "jotai"
import { selectedItemAtom } from "../../store/item.atoms.ts"
import React, { useEffect } from "react"
import { Can } from "../../access-control.ts"
import ItemTopBarComponent from "../items/components/ItemTopBar.component.tsx"
import { Space } from "@mantine/core"
import DataGridItemComponent from "../items/components/DataGridItem.component.tsx"
import DialogDeleteItemComponent from "../items/components/DialogDeleteItem.component.tsx"
import { selectedItemBatchedAtom } from "../../store/itemBatch.atoms.ts"
import DialogDeleteItemBatchComponent from "./components/DialogDeleteItemBatch.component.tsx"

const ItemsView = () => {
   const setSelectedItem = useSetAtom(selectedItemAtom)
   const setSelectedItemBatch = useSetAtom(selectedItemBatchedAtom)

   useEffect(() => {
      setSelectedItem({})
      setSelectedItemBatch({})
   }, [])

   return (
      <Can I="ViewItem" a="user">
         <ItemTopBarComponent />
         <Space h="sm" />
         <DataGridItemComponent />
         <DialogDeleteItemComponent />
         <DialogDeleteItemBatchComponent />
      </Can>
   )
}

export default ItemsView
