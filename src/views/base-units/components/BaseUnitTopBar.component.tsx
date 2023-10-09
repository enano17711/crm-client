import React, { useCallback } from "react"
import { useAtom, useSetAtom } from "jotai"
import {
   baseUnitGridColumnsVisibleAtom,
   openBaseUnitDeleteModalAtom,
   selectedBaseUnitAtom,
} from "../../../store/baseUnit.atoms.ts"
import { useNavigate } from "react-router-dom"
import { Checkbox, Group } from "@mantine/core"
import ActionCreateComponent from "../../../components/top-bar/ActionCreate.component.tsx"
import ActionCloneComponent from "../../../components/top-bar/ActionClone.component.tsx"
import ActionEditComponent from "../../../components/top-bar/ActionEdit.component.tsx"
import ActionDeleteComponent from "../../../components/top-bar/ActionDelete.component.tsx"
import SearchBaseUnitByColumnComponent from "./SearchBaseUnitByColumn.component.tsx"
import ActionExportComponent from "../../../components/top-bar/ActionExport.component.tsx"
import ActionColumnsGridComponent from "../../../components/top-bar/ActionColumnsGrid.component.tsx"
import ActionRefreshDataComponent from "../../../components/top-bar/ActionRefreshData.component.tsx"

const BaseUnitTopBarComponent = () => {
   const [gridColumnsVisible, setGridColumnsVisible] = useAtom(
      baseUnitGridColumnsVisibleAtom,
   )
   const [selectedBaseUnit, setSelectedBaseUnit] = useAtom(selectedBaseUnitAtom)
   const setOpenDeleteModal = useSetAtom(openBaseUnitDeleteModalAtom)
   const navigate = useNavigate()

   const onActionCreateBaseUnit = useCallback(() => {
      setSelectedBaseUnit({})
      navigate("/baseUnits/create")
   }, [navigate, setSelectedBaseUnit])

   return (
      <Group position="apart">
         <Group>
            <ActionCreateComponent createFunction={onActionCreateBaseUnit} />
            <ActionCloneComponent
               disabled={!(selectedBaseUnit?.name !== undefined)}
               cloneUrl={"/baseUnits/create"}
            />
            <ActionEditComponent
               editUrl={"/baseUnits/update/" + selectedBaseUnit?.baseUnitId}
               disabled={!(selectedBaseUnit?.name !== undefined)}
            />
            <ActionDeleteComponent
               deleteFunction={setOpenDeleteModal}
               disabled={!(selectedBaseUnit?.name !== undefined)}
            />
            <SearchBaseUnitByColumnComponent />
            <ActionExportComponent
               pdfUrl={"base-unit/download-base-unit-pdf"}
               pdfName="baseUnits.pdf"
               excelUrl={"base-unit/download-base-unit-excel"}
               excelName="baseUnits.xlsx"
            />
            <ActionColumnsGridComponent>
               <Checkbox.Group
                  value={gridColumnsVisible}
                  onChange={setGridColumnsVisible}
                  w={200}
               >
                  <Group mt="xs" px="xs" pb="xs">
                     <Checkbox value="name" label="Nombre" />
                     <Checkbox value="code" label="Código" />
                     <Checkbox value="description" label="Descripcion" />
                  </Group>
               </Checkbox.Group>
            </ActionColumnsGridComponent>
         </Group>
         <ActionRefreshDataComponent queryKey={["/api/baseUnit/baseUnits"]} />
      </Group>
   )
}

export default BaseUnitTopBarComponent
