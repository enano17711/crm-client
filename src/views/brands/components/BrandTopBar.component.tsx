import React, { useCallback } from "react"
import { Checkbox, Group } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import SearchBrandByColumnComponent from "./SearchBrandByColumn.component.tsx"
import { useAtom, useSetAtom } from "jotai"
import {
   brandGridColumnsVisibleAtom,
   openBrandDeleteModalAtom,
   selectedBrandAtom,
} from "../../../store/brand.atoms.ts"
import ActionCreateComponent from "../../../components/top-bar/ActionCreate.component.tsx"
import ActionCloneComponent from "../../../components/top-bar/ActionClone.component.tsx"
import ActionEditComponent from "../../../components/top-bar/ActionEdit.component.tsx"
import ActionDeleteComponent from "../../../components/top-bar/ActionDelete.component.tsx"
import ActionExportComponent from "../../../components/top-bar/ActionExport.component.tsx"
import ActionColumnsGridComponent from "../../../components/top-bar/ActionColumnsGrid.component.tsx"
import ActionRefreshDataComponent from "../../../components/top-bar/ActionRefreshData.component.tsx"

const BrandTopBarComponent = () => {
   const [gridColumnsVisible, setGridColumnsVisible] = useAtom(
      brandGridColumnsVisibleAtom,
   )
   const [selectedBrand, setSelectedBrand] = useAtom(selectedBrandAtom)
   const setOpenDeleteModal = useSetAtom(openBrandDeleteModalAtom)
   const navigate = useNavigate()

   const onActionCreateBrand = useCallback(() => {
      setSelectedBrand({})
      navigate("/brands/create")
   }, [navigate, setSelectedBrand])

   return (
      <Group position="apart">
         <Group>
            <ActionCreateComponent createFunction={onActionCreateBrand} />
            <ActionCloneComponent
               disabled={!(selectedBrand?.name !== undefined)}
               cloneUrl={"/brands/create"}
            />
            <ActionEditComponent
               editUrl={"/brands/update/" + selectedBrand?.brandId}
               disabled={!(selectedBrand?.name !== undefined)}
            />
            <ActionDeleteComponent
               deleteFunction={setOpenDeleteModal}
               disabled={!(selectedBrand?.name !== undefined)}
            />
            <SearchBrandByColumnComponent />
            <ActionExportComponent
               pdfUrl={"brand/download-brand-pdf"}
               pdfName="brands.pdf"
               excelUrl={"brand/download-brand-excel"}
               excelName="brands.xlsx"
            />
            <ActionColumnsGridComponent>
               <Checkbox.Group
                  value={gridColumnsVisible}
                  onChange={setGridColumnsVisible}
                  w={200}
               >
                  <Group mt="xs" px="xs" pb="xs">
                     <Checkbox value="name" label="Nombre" />
                     <Checkbox value="description" label="Descripcion" />
                  </Group>
               </Checkbox.Group>
            </ActionColumnsGridComponent>
         </Group>
         <ActionRefreshDataComponent queryKey={["/api/brand/brands"]} />
      </Group>
   )
}

export default BrandTopBarComponent
