import { ItemSaleDto } from "../../../api-services"
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
import { useAppStore } from "../../../store"
import { useMemo } from "react"

interface MasterDetailSaleProps {
   data: any
}

const MasterDetailSaleComponent = ({ data }: MasterDetailSaleProps) => {
   const { salesStore } = useAppStore()

   const openModalUpdate = (e: any) => {
      const itemSaleRow = e.row.data as ItemSaleDto
      salesStore.actions.prepareForUpdate(itemSaleRow)
   }

   const isPartialStatus = useMemo(
      () => data.data.status === "Partial",
      [data.data.status],
   )

   return (
      <Box>
         <Title order={3}>Sale Items</Title>
         <DataGrid
            id="ItemSalesDataGrid"
            dataSource={data.data.itemSales}
            keyExpr="itemSaleId"
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
               <Column type="buttons">
                  <Button name="edit" onClick={(e) => openModalUpdate(e)} />
               </Column>
            )}
         </DataGrid>
      </Box>
   )
}

export default MasterDetailSaleComponent
