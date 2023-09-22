import { BaseUnitDto, UnitDto } from "../../../api-services"
import { Box } from "@mantine/core"
import { useAppStore } from "../../../store"

import "devextreme/dist/css/dx.light.css"
import {
   DataGrid,
   Column,
   FilterRow,
   SearchPanel,
   GroupPanel,
   Toolbar,
   Item,
   Editing,
   ColumnChooser,
   Paging,
   Pager,
   Export,
   Selection,
   Button,
} from "devextreme-react/data-grid"
import { exportFormats, exportGrid } from "../../../utils"

interface DataGridProps {
   dataSource: UnitDto[]
   baseUnits: BaseUnitDto[]
}

export const DataGridUnitComponent = ({
   dataSource,
   baseUnits,
}: DataGridProps) => {
   const { unitsStore } = useAppStore()

   const openModalUpdate = (e: any) => {
      const unitRow = e.row.data as UnitDto
      unitsStore.actions.prepareForUpdate(unitRow)
   }

   const openModalDelete = (e: any) => {
      const unitRow = e.row.data as UnitDto
      unitsStore.actions.prepareForDelete(unitRow)
   }

   return (
      <Box>
         <DataGrid
            id="UnidadesDataGrid"
            dataSource={dataSource}
            keyExpr="unitId"
            allowColumnReordering
            allowColumnResizing
            showRowLines
            rowAlternationEnabled
            columnHidingEnabled
            onExporting={exportGrid}
         >
            <Selection mode="multiple" />
            <Export enabled formats={exportFormats} allowExportSelectedData />
            <FilterRow visible />
            <SearchPanel visible />
            <GroupPanel visible />
            <Editing mode="popup" allowUpdating allowDeleting useIcons />
            <Toolbar>
               <Item name="groupPanel" />
               <Item name="columnChooserButton" />
               <Item name="exportButton" />
               <Item name="searchPanel" />
            </Toolbar>
            <Paging enabled defaultPageSize={5} />
            <Pager
               displayMode="adaptive"
               showPageSizeSelector
               allowedPageSizes={[5, 10, 25, 50, 100]}
               showNavigationButtons
            />
            <ColumnChooser enabled mode="dragAndDrop" />
            <Column dataField="name" />
            <Column dataField="code" />
            {/*Add Base Unit column*/}
            <Column dataField="baseUnit.name" />
            <Column dataField="operation" />
            <Column dataField="value" />
            <Column dataField="description" />
            <Column type="buttons">
               <Button name="edit" onClick={(e) => openModalUpdate(e)} />
               <Button name="delete" onClick={(e) => openModalDelete(e)} />
            </Column>
         </DataGrid>
      </Box>
   )
}
