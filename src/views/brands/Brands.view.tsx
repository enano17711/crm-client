import React from "react"
import { Space } from "@mantine/core"
import { DataGridBrandComponent } from "./components/DataGridBrand.component.tsx"
import { Can } from "../../access-control.ts"
import DialogDeleteBrandComponent from "./components/DialogDeleteBrand.component.tsx"
import BrandTopBarComponent from "./components/BrandTopBar.component.tsx"

const BrandsView = () => {
   return (
      <Can I="ViewBrand" a="user">
         <BrandTopBarComponent />
         <Space h="sm" />
         <DataGridBrandComponent />
         <DialogDeleteBrandComponent />
      </Can>
   )
}

export default BrandsView
