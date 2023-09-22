import React from "react"
import { Box, Title } from "@mantine/core"
import {
   Column,
   DataGrid,
   Export,
   FilterRow,
   Item,
   Pager,
   Paging,
   SearchPanel,
   Selection,
   Toolbar,
} from "devextreme-react/data-grid"
import { exportFormats, exportGrid } from "../../../utils"

interface MasterDetailAdjustmentProps {
   data: any
}
const MasterDetailAdjustmentComponent = ({
   data,
}: MasterDetailAdjustmentProps) => {
   return (
      <Box>
         <Title order={3}>Items Adjustments</Title>
         <DataGrid
            id="ItemAdjustmentsDataGrid"
            dataSource={data.data.itemAdjustments}
            keyExpr="itemAdjustmentId"
            allowColumnResizing
            rowAlternationEnabled
            onExporting={exportGrid}
         >
            <Selection mode="multiple" />
            <Export enabled formats={exportFormats} allowExportSelectedData />
            <FilterRow visible />
            <SearchPanel visible />
            <Toolbar>
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
            <Column dataField="item.name" />
            <Column dataField="item.code" />
            <Column dataField="action" />
            <Column dataField="quantity" />
         </DataGrid>
      </Box>
   )
}

export default MasterDetailAdjustmentComponent
