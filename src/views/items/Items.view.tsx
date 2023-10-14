import { useSetAtom } from "jotai"
import { selectedItemAtom } from "../../store/item.atoms.ts"
import React, { useEffect } from "react"
import { Can } from "../../access-control.ts"
import ItemTopBarComponent from "../items/components/ItemTopBar.component.tsx"
import { Space } from "@mantine/core"
import DataGridItemComponent from "../items/components/DataGridItem.component.tsx"
import DialogDeleteItemComponent from "../items/components/DialogDeleteItem.component.tsx"

const ItemsView = () => {
   const setSingleItem = useSetAtom(selectedItemAtom)

   useEffect(() => {
      setSingleItem({})
   }, [])

   return (
      <Can I="ViewItem" a="user">
         <ItemTopBarComponent />
         <Space h="sm" />
         <DataGridItemComponent />
         <DialogDeleteItemComponent />
      </Can>
   )
}

export default ItemsView
