import React, { useCallback } from "react"
import { useAtom, useSetAtom } from "jotai"
import {
   categoryItemGridColumnsVisibleAtom,
   openCategoryItemDeleteModalAtom,
   selectedCategoryItemAtom,
} from "../../../store/categoryItem.atoms.ts"
import { useNavigate } from "react-router-dom"
import { Checkbox, Group } from "@mantine/core"
import ActionCreateComponent from "../../../components/top-bar/ActionCreate.component.tsx"
import ActionCloneComponent from "../../../components/top-bar/ActionClone.component.tsx"
import ActionEditComponent from "../../../components/top-bar/ActionEdit.component.tsx"
import ActionDeleteComponent from "../../../components/top-bar/ActionDelete.component.tsx"
import SearchCategoryItemByColumnComponent from "../../category-items/components/SearchCategoryItemByColumn.component.tsx"
import ActionExportComponent from "../../../components/top-bar/ActionExport.component.tsx"
import ActionColumnsGridComponent from "../../../components/top-bar/ActionColumnsGrid.component.tsx"
import ActionRefreshDataComponent from "../../../components/top-bar/ActionRefreshData.component.tsx"

const CategoryItemTopBarComponent = () => {
   const [gridColumnsVisible, setGridColumnsVisible] = useAtom(
      categoryItemGridColumnsVisibleAtom,
   )
   const [selectedCategoryItem, setSelectedCategoryItem] = useAtom(
      selectedCategoryItemAtom,
   )
   const setOpenDeleteModal = useSetAtom(openCategoryItemDeleteModalAtom)
   const navigate = useNavigate()

   const onActionCreateCategoryItem = useCallback(() => {
      setSelectedCategoryItem({})
      navigate("/category-items/create")
   }, [navigate, setSelectedCategoryItem])

   return (
      <Group position="apart">
         <Group>
            <ActionCreateComponent
               createFunction={onActionCreateCategoryItem}
            />
            <ActionCloneComponent
               disabled={!(selectedCategoryItem?.name !== undefined)}
               cloneUrl={"/category-items/create"}
            />
            <ActionEditComponent
               editUrl={
                  "/category-items/update/" +
                  selectedCategoryItem?.categoryItemId
               }
               disabled={!(selectedCategoryItem?.name !== undefined)}
            />
            <ActionDeleteComponent
               deleteFunction={setOpenDeleteModal}
               disabled={!(selectedCategoryItem?.name !== undefined)}
            />
            <SearchCategoryItemByColumnComponent />
            <ActionExportComponent
               pdfUrl={"category-item/download-category-item-pdf"}
               pdfName="category-items.pdf"
               excelUrl={"category-item/download-category-item-excel"}
               excelName="category-items.xlsx"
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
         <ActionRefreshDataComponent
            queryKey={["/api/category-item/category-items"]}
         />
      </Group>
   )
}

export default CategoryItemTopBarComponent
