import { ItemDto } from "../../../api-services"
import { Badge, Box, Title } from "@mantine/core"
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
   MasterDetail,
} from "devextreme-react/data-grid"
import { exportFormats, exportGrid } from "../../../utils"
import MasterDetailsectionComponent from "./MasterDetailsection.component.tsx"

interface DataGridProps {
   dataSource: ItemDto[]
}

export const DataGridItemComponent = ({ dataSource }: DataGridProps) => {
   const { itemsStore } = useAppStore()

   const openModalUpdate = (e: any) => {
      const itemRow = e.row.data as ItemDto
      itemsStore.actions.prepareForUpdate(itemRow)
   }

   const openModalDelete = (e: any) => {
      const itemRow = e.row.data as ItemDto
      itemsStore.actions.prepareForDelete(itemRow)
   }

   return (
      <Box>
         <DataGrid
            id="ItemsDataGrid"
            dataSource={dataSource}
            keyExpr="itemId"
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
            <Column dataField="code" />
            <Column dataField="price" />
            <Column dataField="cost" />
            <Column dataField="quantity" />
            <Column dataField="isBatched" />
            <Column dataField="taxMethod" />
            <Column dataField="tax.name" />
            <Column dataField="brand.name" />
            <Column dataField="unitPrice.name" />
            <Column dataField="unitCost.name" />
            <Column
               dataField="categoryItems"
               customizeText={(cellInfo) =>
                  cellInfo.value.map((x) => x.name).join(", ")
               }
            />
            <MasterDetail enabled component={MasterDetailsectionComponent} />
            <Column type="buttons">
               <Button name="edit" onClick={(e) => openModalUpdate(e)} />
               <Button name="delete" onClick={(e) => openModalDelete(e)} />
            </Column>
         </DataGrid>
      </Box>
   )
}
