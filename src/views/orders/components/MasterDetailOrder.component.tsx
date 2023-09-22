import {
   Button,
   Column,
   DataGrid,
   Editing,
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
import { Box, Title } from "@mantine/core"
import { useMemo } from "react"
import OrderItemQuantityUpdateActionColumnComponent from "./OrderItemQuantityUpdateActionColumn.component.tsx"
/*import { useAppStore } from "../../../store"
import { ItemOrderDto } from "../../../api-services"*/

interface MasterDetailOrderProps {
   data: any
}

const MasterDetailOrderComponent = ({ data }: MasterDetailOrderProps) => {
   // const { ordersStore } = useAppStore()

   const isPartialStatus = useMemo(
      () => data.data.status === "Partial",
      [data.data.status],
   )

   return (
      <Box>
         <Title order={3}>Order Items</Title>
         <DataGrid
            id="ItemOrdersDataGrid"
            dataSource={data.data.itemOrders}
            keyExpr="itemOrderId"
            allowColumnResizing
            rowAlternationEnabled
            onExporting={exportGrid}
            repaintChangesOnly={true}
            cacheEnabled={true}
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
            {isPartialStatus && <Editing mode="popup" allowUpdating useIcons />}
            <Column dataField="item.name" caption="Item" />
            <Column dataField="item.code" caption="Code" />
            <Column dataField="batchNumber" caption="Batch" />
            <Column dataField="batchDate" caption="Expiration" />
            <Column dataField="quantity" caption="Quantity" />
            {isPartialStatus && (
               <Column dataField="receivedQuantity" caption="Received" />
            )}
            <Column dataField="unitCostNet" caption="Unit Cost" />
            {/*<Column dataField="taxRate" />*/}
            <Column dataField="tax" caption="Tax" />
            <Column dataField="discount" caption="Discount" />
            <Column dataField="total" caption="Total" />
            {isPartialStatus && (
               <Column
                  type="buttons"
                  caption="Actions"
                  width={80}
                  cellComponent={OrderItemQuantityUpdateActionColumnComponent}
               />
            )}
         </DataGrid>
      </Box>
   )
}

export default MasterDetailOrderComponent
