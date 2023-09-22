import { AdjustmentDto } from "../../../api-services"
import { Box } from "@mantine/core"

import "devextreme/dist/css/dx.light.css"
import {
   DataGrid,
   Column,
   FilterRow,
   SearchPanel,
   GroupPanel,
   Toolbar,
   Item,
   ColumnChooser,
   Paging,
   Pager,
   Export,
   Selection,
   MasterDetail,
} from "devextreme-react/data-grid"
import { exportFormats, exportGrid } from "../../../utils"
import MasterDetailAdjustmentBatchComponent from "./MasterDetailAdjustmentBatch.component.tsx"

interface DataGridProps {
   dataSource: AdjustmentDto[]
}

export const DataGridAdjustmentComponent = ({ dataSource }: DataGridProps) => {
   return (
      <Box>
         <DataGrid
            id="AjustesDataGrid"
            dataSource={dataSource}
            keyExpr="adjustmentId"
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
            <Column dataField="referenceNumber" />
            <Column dataField="itemsCount" />
            <Column dataField="totalQuantity" />
            <Column dataField="note" />
            <MasterDetail
               enabled
               component={MasterDetailAdjustmentBatchComponent}
            />
         </DataGrid>
      </Box>
   )
}
