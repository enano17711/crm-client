import React, { useEffect, useState } from "react"
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
import { ItemAdjustmentDto } from "../../../api-services"

interface MasterDetailAdjustmentProps {
   data: any
}

const MasterDetailAdjustmentBatchComponent = ({
   data,
}: MasterDetailAdjustmentProps) => {
   // const [localData, setLocalData] = useState([])
   const [localData, setLocalData] = useState(() => {
      const newData = data.data.itemAdjustments as ItemAdjustmentDto[]
      return newData.reduce((acc, item) => {
         if (item.itemBatch !== null && item.itemBatch !== undefined) {
            acc.push({
               itemAdjustmentId: item.itemAdjustmentId,
               itemName: item.item.name,
               itemCode: item.item.code,
               itemBatch: item.itemBatch.batchNumber,
               itemDate: new Date(
                  item.itemBatch.batchDate,
               ).toLocaleDateString(),
               action: item.action,
               quantity: item.quantity,
            })
         }
         return acc
      }, [])
   })

   /*   useEffect(() => {
      const newData = data.data.itemAdjustments as ItemAdjustmentDto[]
      console.log("newData", newData)
      let dataFormatted = newData
         .filter((item) => {
            return item.itemBatch !== null && item.itemBatch !== undefined
         })
         .map((item) => {
            return {
               itemAdjustmentId: item.itemAdjustmentId,
               itemName: item.item.name,
               itemCode: item.item.code,
               itemBatch: item.itemBatch.batchNumber,
               itemDate: new Date(
                  item.itemBatch.batchDate,
               ).toLocaleDateString(),
               action: item.action,
               quantity: item.quantity,
            }
         })
      console.log("dataFormatted", dataFormatted)
      setLocalData(dataFormatted)
   }, [data])*/
   useEffect(() => {
      const newData = data.data.itemAdjustments as ItemAdjustmentDto[]
      const dataFormatted = newData.reduce((acc, item) => {
         if (item.itemBatch !== null && item.itemBatch !== undefined) {
            acc.push({
               itemAdjustmentId: item.itemAdjustmentId,
               itemName: item.item.name,
               itemCode: item.item.code,
               itemBatch: item.itemBatch.batchNumber,
               itemDate: new Date(
                  item.itemBatch.batchDate,
               ).toLocaleDateString(),
               action: item.action,
               quantity: item.quantity,
            })
         }
         return acc
      }, [])
      setLocalData(dataFormatted)
   }, [data])

   return (
      <Box>
         <Title order={3}>Items Adjustments</Title>
         {localData.length > 0 ? (
            <DataGrid
               id="ItemAdjustmentsDataGrid"
               dataSource={localData}
               keyExpr="itemAdjustmentId"
               allowColumnResizing
               rowAlternationEnabled
               onExporting={exportGrid}
            >
               <Selection mode="multiple" />
               <Export
                  enabled
                  formats={exportFormats}
                  allowExportSelectedData
               />
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
               <Column dataField="itemName" />
               <Column dataField="itemCode" />
               <Column dataField="itemBatch" />
               <Column dataField="itemDate" />
               <Column dataField="action" />
               <Column dataField="quantity" />
            </DataGrid>
         ) : (
            <DataGrid
               id="ItemAdjustmentsDataGrid"
               dataSource={data.data.itemAdjustments}
               keyExpr="itemAdjustmentId"
               allowColumnResizing
               rowAlternationEnabled
               onExporting={exportGrid}
            >
               <Selection mode="multiple" />
               <Export
                  enabled
                  formats={exportFormats}
                  allowExportSelectedData
               />
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
         )}
      </Box>
   )
}

export default MasterDetailAdjustmentBatchComponent
