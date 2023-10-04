import React, { useEffect } from "react"
import { Space } from "@mantine/core"
import { DataGridBrandComponent } from "./components/DataGridBrand.component.tsx"
import { Can } from "../../access-control.ts"
import DialogDeleteBrandComponent from "./components/DialogDeleteBrand.component.tsx"
import BrandTopBarComponent from "./components/BrandTopBar.component.tsx"
import { useSetAtom } from "jotai"
import { selectedBrandAtom } from "../../store/brand.atoms.ts"
import { useQueryClient } from "@tanstack/react-query"

const BrandsView = () => {
   const setSingleBrand = useSetAtom(selectedBrandAtom)
   const queryClient = useQueryClient()

   useEffect(() => {
      setSingleBrand({})
      queryClient.invalidateQueries({
         queryKey: ["/api/brand/brands", ["/api/brand/brand"]],
      })
   }, [])

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
