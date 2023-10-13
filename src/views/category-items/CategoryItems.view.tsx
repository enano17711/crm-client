import { useSetAtom } from "jotai"
import { selectedCategoryItemAtom } from "../../store/categoryItem.atoms.ts"
import React, { useEffect } from "react"
import { Can } from "../../access-control.ts"
import { Space } from "@mantine/core"
import CategoryItemTopBarComponent from "./components/CategoryItemTopBar.component.tsx"
import { DataGridCategoryItemComponent } from "./components/DataGridCategoryItem.component.tsx"
import DialogDeleteCategoryItemComponent from "./components/DialogDeleteCategoryItem.component.tsx"

const CategoryItemsView = () => {
   const setSingleCategoryItem = useSetAtom(selectedCategoryItemAtom)

   useEffect(() => {
      setSingleCategoryItem({})
   }, [])

   return (
      <Can I="ViewCategoryItem" a="user">
         <CategoryItemTopBarComponent />
         <Space h="sm" />
         <DataGridCategoryItemComponent />
         <DialogDeleteCategoryItemComponent />
      </Can>
   )
}

export default CategoryItemsView
