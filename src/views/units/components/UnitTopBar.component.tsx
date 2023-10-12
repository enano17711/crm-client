import React, { useCallback } from "react"
import { useAtom, useSetAtom } from "jotai"
import {
   openUnitDeleteModalAtom,
   selectedUnitAtom,
   unitGridColumnsVisibleAtom,
} from "../../../store/unit.atoms.ts"
import { useNavigate } from "react-router-dom"
import { Checkbox, Group } from "@mantine/core"
import ActionCreateComponent from "../../../components/top-bar/ActionCreate.component.tsx"
import ActionCloneComponent from "../../../components/top-bar/ActionClone.component.tsx"
import ActionEditComponent from "../../../components/top-bar/ActionEdit.component.tsx"
import ActionDeleteComponent from "../../../components/top-bar/ActionDelete.component.tsx"
import SearchUnitByColumnComponent from "../../units/components/SearchUnitByColumn.component.tsx"
import ActionExportComponent from "../../../components/top-bar/ActionExport.component.tsx"
import ActionColumnsGridComponent from "../../../components/top-bar/ActionColumnsGrid.component.tsx"
import ActionRefreshDataComponent from "../../../components/top-bar/ActionRefreshData.component.tsx"

interface UnitTopBarComponentProps {
   showSearchAction?: boolean
}

const UnitTopBarComponent = ({
   showSearchAction = true,
}: UnitTopBarComponentProps) => {
   const [gridColumnsVisible, setGridColumnsVisible] = useAtom(
      unitGridColumnsVisibleAtom,
   )
   const [selectedUnit, setSelectedUnit] = useAtom(selectedUnitAtom)
   const setOpenDeleteModal = useSetAtom(openUnitDeleteModalAtom)
   const navigate = useNavigate()

   const onActionCreateUnit = useCallback(() => {
      setSelectedUnit({})
      navigate("/units/create")
   }, [navigate, setSelectedUnit])

   return (
      <Group position="apart">
         <Group>
            <ActionCreateComponent createFunction={onActionCreateUnit} />
            <ActionCloneComponent
               disabled={!(selectedUnit?.name !== undefined)}
               cloneUrl={"/units/create"}
            />
            <ActionEditComponent
               editUrl={"/units/update/" + selectedUnit?.unitId}
               disabled={!(selectedUnit?.name !== undefined)}
            />
            <ActionDeleteComponent
               deleteFunction={setOpenDeleteModal}
               disabled={!(selectedUnit?.name !== undefined)}
            />
            {showSearchAction && <SearchUnitByColumnComponent />}
            <ActionExportComponent
               pdfUrl={"unit/download-unit-pdf"}
               pdfName="units.pdf"
               excelUrl={"unit/download-unit-excel"}
               excelName="units.xlsx"
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
                     <Checkbox value="baseUnit" label="U. Base" />
                     <Checkbox value="operation" label="Operacion" />
                     <Checkbox value="value" label="Valor" />
                     <Checkbox value="description" label="Descripcion" />
                  </Group>
               </Checkbox.Group>
            </ActionColumnsGridComponent>
         </Group>
         <ActionRefreshDataComponent queryKey={["/api/unit/units"]} />
      </Group>
   )
}

export default UnitTopBarComponent
