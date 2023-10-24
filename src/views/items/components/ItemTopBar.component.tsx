import React, { useCallback } from "react"
import { useAtom, useSetAtom } from "jotai"
import {
   itemGridColumnsVisibleAtom,
   openItemDeleteModalAtom,
   selectedItemAtom,
} from "../../../store/item.atoms.ts"
import { useNavigate } from "react-router-dom"
import { Checkbox, Group, Menu } from "@mantine/core"
import ActionDeleteComponent from "../../../components/top-bar/ActionDelete.component.tsx"
import SearchItemByColumnComponent from "../../items/components/SearchItemByColumn.component.tsx"
import ActionExportComponent from "../../../components/top-bar/ActionExport.component.tsx"
import ActionColumnsGridComponent from "../../../components/top-bar/ActionColumnsGrid.component.tsx"
import ActionRefreshDataComponent from "../../../components/top-bar/ActionRefreshData.component.tsx"
import ActionCreateMenuComponent from "../../../components/top-bar/ActionCreateMenu.component.tsx"
import { Icon3dRotate, IconPackage } from "@tabler/icons-react"
import { selectedItemBatchedAtom } from "../../../store/itemBatch.atoms.ts"
import ActionCloneMenuComponent from "../../../components/top-bar/ActionCloneMenu.component.tsx"
import ActionEditMenuComponent from "../../../components/top-bar/ActionEditMenu.component.tsx"

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
   const [selectedItemBatch, setSelectedItemBatch] = useAtom(
      selectedItemBatchedAtom,
   )
   const setOpenDeleteModal = useSetAtom(openItemDeleteModalAtom)
   const navigate = useNavigate()

   const onActionCreateItem = useCallback(() => {
      setSelectedItem({})
      navigate("/items/create")
   }, [navigate, setSelectedItem])

   const onActionCreateItemBatch = useCallback(() => {
      setSelectedItemBatch({})
      navigate("/items/create-batch")
   }, [navigate, setSelectedItemBatch])

   const onActionCloneItem = useCallback(() => {
      navigate("/items/create")
   }, [navigate])

   const onActionCloneItemBatch = useCallback(() => {
      navigate("/items/create-batch")
   }, [navigate])

   const onActionEditItem = useCallback(() => {
      navigate("/items/update/" + selectedItem?.itemId)
   }, [navigate, selectedItem?.itemId])

   const onActionEditItemBatch = useCallback(() => {
      navigate("/items/update-batch/" + selectedItemBatch?.itemBatchId)
   }, [navigate, selectedItemBatch?.itemBatchId])

   return (
      <Group position="apart">
         <Group>
            <ActionCreateMenuComponent>
               <Menu.Item
                  icon={<IconPackage size={14} />}
                  onClick={() => onActionCreateItem()}
               >
                  Item
               </Menu.Item>
               <Menu.Item
                  icon={<Icon3dRotate size={14} />}
                  onClick={() => onActionCreateItemBatch()}
               >
                  Item Batch
               </Menu.Item>
            </ActionCreateMenuComponent>
            <ActionCloneMenuComponent
               disabled={
                  !(
                     selectedItem?.name !== undefined ||
                     selectedItemBatch?.batchNumber !== undefined
                  )
               }
            >
               <Menu.Item
                  disabled={!(selectedItem?.name !== undefined)}
                  icon={<IconPackage size={14} />}
                  onClick={() => onActionCloneItem()}
               >
                  Item
               </Menu.Item>
               <Menu.Item
                  disabled={!(selectedItemBatch?.batchNumber !== undefined)}
                  icon={<Icon3dRotate size={14} />}
                  onClick={() => onActionCloneItemBatch()}
               >
                  Item Batch
               </Menu.Item>
            </ActionCloneMenuComponent>

            <ActionEditMenuComponent
               disabled={
                  !(
                     selectedItem?.name !== undefined ||
                     selectedItemBatch?.batchNumber !== undefined
                  )
               }
            >
               <Menu.Item
                  disabled={!(selectedItem?.name !== undefined)}
                  icon={<IconPackage size={14} />}
                  onClick={() => onActionEditItem()}
               >
                  Item
               </Menu.Item>
               <Menu.Item
                  disabled={!(selectedItemBatch?.batchNumber !== undefined)}
                  icon={<Icon3dRotate size={14} />}
                  onClick={() => onActionEditItemBatch()}
               >
                  Item Batch
               </Menu.Item>
            </ActionEditMenuComponent>
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
