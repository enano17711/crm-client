import React, { useEffect } from "react"
import { Box } from "@mantine/core"
import {
   Column,
   ColumnChooser,
   DataGrid,
   Export,
   FilterRow,
   GroupPanel,
   Item,
   MasterDetail,
   Pager,
   Paging,
   SearchPanel,
   Selection,
   Toolbar,
} from "devextreme-react/data-grid"
import { exportFormats, exportGrid } from "../../../utils"
import MasterDetailOrderComponent from "./MasterDetailOrder.component.tsx"
import { createStore } from "devextreme-aspnet-data-nojquery"
import ModalEditeOrderItemQuantityComponent from "./ModalEditeOrderItemQuantity.component.tsx"
import OrderStatusActionColumnComponent from "./OrderStatusActionColumn.component.tsx"
import { accessTokenKey, refreshAccessTokenKey } from "../../../axios-utils.ts"

const orderDataSource = createStore({
   key: "orderId",
   loadUrl: "https://localhost:5001/api/order/orders-for-grid",
   onBeforeSend: (method, ajaxOptions) => {
      ajaxOptions.headers = {
         Authorization: "Bearer " + localStorage.getItem(accessTokenKey),
         "X-Authorization":
            "Bearer " + localStorage.getItem(refreshAccessTokenKey),
      }
   },
})

const DataGridOrdersComponent = () => {
   const refGrid = React.useRef(null)

   return (
      <Box>
         <DataGrid
            ref={refGrid}
            id="OrdenesDataGrid"
            dataSource={orderDataSource}
            allowColumnReordering
            allowColumnResizing
            showRowLines
            rowAlternationEnabled
            columnHidingEnabled
            onExporting={exportGrid}
            repaintChangesOnly={true}
            cacheEnabled={true}
            remoteOperations={{ paging: true, filtering: true }}
            style={{ minHeight: "480px" }}
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
            <Column
               dataField="referenceNumber"
               width={200}
               caption="Reference"
            />
            <Column dataField="status" width={100} caption="Status" />
            <Column dataField="itemsCount" width={100} caption="Items" />
            <Column
               dataField="totalQuantity"
               width={100}
               caption="Items Quantity"
            />
            <Column
               dataField="totalDiscount"
               width={100}
               caption="Items Discount"
            />
            <Column dataField="totalTax" width={100} caption="Items Tax" />
            <Column dataField="totalCost" width={100} caption="Items Cost" />
            {/*<Column dataField="orderTaxRate" width={100} caption="Tax" />*/}
            <Column dataField="orderTax" width={100} caption="Tax" />
            <Column dataField="orderDiscount" width={100} caption="Discount" />
            <Column dataField="grandTotal" width={100} caption="Total" />
            <Column dataField="supplier.name" width={100} caption="Supplier" />
            <Column dataField="note" caption="Note" />
            <Column
               type="buttons"
               caption="Actions"
               width={80}
               cellComponent={OrderStatusActionColumnComponent}
            ></Column>
            <MasterDetail enabled component={MasterDetailOrderComponent} />
         </DataGrid>
         <ModalEditeOrderItemQuantityComponent refGrid={refGrid} />
      </Box>
   )
}

export default DataGridOrdersComponent
