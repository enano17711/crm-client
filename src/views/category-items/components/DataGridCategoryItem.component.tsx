import { CategoryItemDto } from "../../../api-services"
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
   dataSource: CategoryItemDto[]
}

export const DataGridCategoryItemComponent = ({
   dataSource,
}: DataGridProps) => {
   const { categoryItemsStore } = useAppStore()

   const openModalUpdate = (e: any) => {
      const categoryItemRow = e.row.data as CategoryItemDto
      categoryItemsStore.actions.prepareForUpdate(categoryItemRow)
   }

   const openModalDelete = (e: any) => {
      const categoryItemRow = e.row.data as CategoryItemDto
      categoryItemsStore.actions.prepareForDelete(categoryItemRow)
   }

   return (
      <Box>
         <DataGrid
            id="CategoriaItemsDataGrid"
            dataSource={dataSource}
            keyExpr="categoryItemId"
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
            <Column dataField="description" />
            <Column type="buttons">
               <Button name="edit" onClick={(e) => openModalUpdate(e)} />
               <Button name="delete" onClick={(e) => openModalDelete(e)} />
            </Column>
         </DataGrid>
      </Box>
   )
}
