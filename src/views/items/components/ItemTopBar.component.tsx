import React, { useCallback } from "react"
import { useAtom, useSetAtom } from "jotai"
import {
   itemGridColumnsVisibleAtom,
   openItemDeleteModalAtom,
   selectedItemAtom,
} from "../../../store/item.atoms.ts"
import { useNavigate } from "react-router-dom"
import { Checkbox, Group } from "@mantine/core"
import ActionCreateComponent from "../../../components/top-bar/ActionCreate.component.tsx"
import ActionCloneComponent from "../../../components/top-bar/ActionClone.component.tsx"
import ActionEditComponent from "../../../components/top-bar/ActionEdit.component.tsx"
import ActionDeleteComponent from "../../../components/top-bar/ActionDelete.component.tsx"
import SearchItemByColumnComponent from "../../items/components/SearchItemByColumn.component.tsx"
import ActionExportComponent from "../../../components/top-bar/ActionExport.component.tsx"
import ActionColumnsGridComponent from "../../../components/top-bar/ActionColumnsGrid.component.tsx"
import ActionRefreshDataComponent from "../../../components/top-bar/ActionRefreshData.component.tsx"

interface ItemTopBarComponentProps {
   showSearchAction?: boolean
}

const ItemTopBarComponent = ({
   showSearchAction = true,
}: ItemTopBarComponentProps) => {
   const [gridColumnsVisible, setGridColumnsVisible] = useAtom(
      itemGridColumnsVisibleAtom,
   )
   const [selectedItem, setSelectedItem] = useAtom(selectedItemAtom)
   const setOpenDeleteModal = useSetAtom(openItemDeleteModalAtom)
   const navigate = useNavigate()

   const onActionCreateItem = useCallback(() => {
      setSelectedItem({})
      navigate("/items/create")
   }, [navigate, setSelectedItem])

   return (
      <Group position="apart">
         <Group>
            <ActionCreateComponent createFunction={onActionCreateItem} />
            <ActionCloneComponent
               disabled={!(selectedItem?.name !== undefined)}
               cloneUrl={"/items/create"}
            />
            <ActionEditComponent
               editUrl={"/items/update/" + selectedItem?.itemId}
               disabled={!(selectedItem?.name !== undefined)}
            />
            <ActionDeleteComponent
               deleteFunction={setOpenDeleteModal}
               disabled={!(selectedItem?.name !== undefined)}
            />
            {showSearchAction && <SearchItemByColumnComponent />}
            <ActionExportComponent
               pdfUrl={"item/download-item-pdf"}
               pdfName="items.pdf"
               excelUrl={"item/download-item-excel"}
               excelName="items.xlsx"
            />
            <ActionColumnsGridComponent>
               <Checkbox.Group
                  value={gridColumnsVisible}
                  onChange={setGridColumnsVisible}
                  w={200}
               >
                  <Group mt="xs" px="xs" pb="xs">
                     <Checkbox value="name" label="Nombre" />
                     <Checkbox value="code" label="Code" />
                     <Checkbox value="brand" label="Marca" />
                     <Checkbox value="isBatched" label="Batches" />
                     <Checkbox value="unitPrice" label="Unit Price" />
                     <Checkbox value="price" label="Price" />
                     <Checkbox value="unitCost" label="Unit Cost" />
                     <Checkbox value="cost" label="Cost" />
                     <Checkbox value="quantity" label="Quantity" />
                     <Checkbox value="taxCostMethod" label="Tax Cost Method" />
                     <Checkbox value="taxCost" label="Tax Cost" />
                     <Checkbox
                        value="taxPriceMethod"
                        label="Tax Price Method"
                     />
                     <Checkbox value="taxPrice" label="Tax Price" />
                     <Checkbox value="description" label="Descripcion" />
                  </Group>
               </Checkbox.Group>
            </ActionColumnsGridComponent>
         </Group>
         <ActionRefreshDataComponent queryKey={["/api/item/items"]} />
      </Group>
   )
}

export default ItemTopBarComponent
