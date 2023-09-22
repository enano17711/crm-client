import { SupplierDto } from "../../../api-services"
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
   dataSource: SupplierDto[]
}

export const DataGridSupplierComponent = ({ dataSource }: DataGridProps) => {
   const { suppliersStore } = useAppStore()

   const openModalUpdate = (e: any) => {
      const supplierRow = e.row.data as SupplierDto
      suppliersStore.actions.prepareForUpdate(supplierRow)
   }

   const openModalDelete = (e: any) => {
      const supplierRow = e.row.data as SupplierDto
      suppliersStore.actions.prepareForDelete(supplierRow)
   }

   return (
      <Box>
         <DataGrid
            id="ProveedoresDataGrid"
            dataSource={dataSource}
            keyExpr="supplierId"
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
            <Column dataField="companyName" />
            <Column dataField="nit" />
            <Column dataField="ci" />
            <Column dataField="email" />
            <Column dataField="phone" />
            <Column dataField="address" />
            <Column dataField="city" />
            <Column dataField="state" />
            <Column dataField="country" />
            <Column type="buttons">
               <Button name="edit" onClick={(e) => openModalUpdate(e)} />
               <Button name="delete" onClick={(e) => openModalDelete(e)} />
            </Column>
         </DataGrid>
      </Box>
   )
}
