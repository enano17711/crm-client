import React, { useCallback } from "react"
import { useAtom, useSetAtom } from "jotai"
import {
   openTaxDeleteModalAtom,
   selectedTaxAtom,
   taxGridColumnsVisibleAtom,
} from "../../../store/tax.atoms.ts"
import { useNavigate } from "react-router-dom"
import { Checkbox, Group } from "@mantine/core"
import ActionCreateComponent from "../../../components/top-bar/ActionCreate.component.tsx"
import ActionCloneComponent from "../../../components/top-bar/ActionClone.component.tsx"
import ActionEditComponent from "../../../components/top-bar/ActionEdit.component.tsx"
import ActionDeleteComponent from "../../../components/top-bar/ActionDelete.component.tsx"
import SearchTaxByColumnComponent from "../../taxs/components/SearchTaxByColumn.component.tsx"
import ActionExportComponent from "../../../components/top-bar/ActionExport.component.tsx"
import ActionColumnsGridComponent from "../../../components/top-bar/ActionColumnsGrid.component.tsx"
import ActionRefreshDataComponent from "../../../components/top-bar/ActionRefreshData.component.tsx"

const TaxTopBarComponent = () => {
   const [gridColumnsVisible, setGridColumnsVisible] = useAtom(
      taxGridColumnsVisibleAtom,
   )
   const [selectedTax, setSelectedTax] = useAtom(selectedTaxAtom)
   const setOpenDeleteModal = useSetAtom(openTaxDeleteModalAtom)
   const navigate = useNavigate()

   const onActionCreateTax = useCallback(() => {
      setSelectedTax({})
      navigate("/taxes/create")
   }, [navigate, setSelectedTax])

   return (
      <Group position="apart">
         <Group>
            <ActionCreateComponent createFunction={onActionCreateTax} />
            <ActionCloneComponent
               disabled={!(selectedTax?.name !== undefined)}
               cloneUrl={"/taxes/create"}
            />
            <ActionEditComponent
               editUrl={"/taxes/update/" + selectedTax?.taxId}
               disabled={!(selectedTax?.name !== undefined)}
            />
            <ActionDeleteComponent
               deleteFunction={setOpenDeleteModal}
               disabled={!(selectedTax?.name !== undefined)}
            />
            <SearchTaxByColumnComponent />
            <ActionExportComponent
               pdfUrl={"tax/download-tax-pdf"}
               pdfName="taxes.pdf"
               excelUrl={"tax/download-tax-excel"}
               excelName="taxes.xlsx"
            />
            <ActionColumnsGridComponent>
               <Checkbox.Group
                  value={gridColumnsVisible}
                  onChange={setGridColumnsVisible}
                  w={200}
               >
                  <Group mt="xs" px="xs" pb="xs">
                     <Checkbox value="name" label="Nombre" />
                     <Checkbox value="rate" label="Tasa %" />
                     <Checkbox value="description" label="Descripcion" />
                  </Group>
               </Checkbox.Group>
            </ActionColumnsGridComponent>
         </Group>
         <ActionRefreshDataComponent queryKey={["/api/tax/taxs"]} />
      </Group>
   )
}

export default TaxTopBarComponent
