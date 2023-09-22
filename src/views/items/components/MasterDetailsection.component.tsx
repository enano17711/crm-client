import React from "react"
import { Box, Title } from "@mantine/core"
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
import { Button as ButtonForToolbar } from "devextreme-react/button"
import { exportFormats, exportGrid } from "../../../utils"
import { ItemBatchDto, ItemDto } from "../../../api-services"
import { useAppStore } from "../../../store"

interface MasterDetailsectionProps {
   data: any
}
const MasterDetailsectionComponent = ({ data }: MasterDetailsectionProps) => {
   const { itemsStore } = useAppStore()

   const openModalDelete = (e: any) => {
      itemsStore.actions.prepareForDeleteBatch(e.row.data as ItemBatchDto)
   }

   return (
      <Box>
         <Title order={3}>Item Batchs</Title>
         <DataGrid
            id="ItemBatchesDataGrid"
            dataSource={data?.data?.itemBatches}
            keyExpr="itemBatchId"
            allowColumnResizing
            rowAlternationEnabled
            onExporting={exportGrid}
         >
            <Selection mode="multiple" />
            <Export enabled formats={exportFormats} allowExportSelectedData />
            <FilterRow visible />
            <SearchPanel visible />
            <Editing mode="popup" allowDeleting useIcons />
            <Paging enabled defaultPageSize={5} />
            <Pager
               displayMode="adaptive"
               showPageSizeSelector
               allowedPageSizes={[5, 10, 25, 50, 100]}
               showNavigationButtons
            />
            <Column dataField="batchNumber" />
            <Column dataField="batchDate" />
            <Column dataField="quantity" />
            <Column type="buttons">
               <Button name="delete" onClick={(e) => openModalDelete(e)} />
            </Column>
         </DataGrid>
      </Box>
   )
}

export default MasterDetailsectionComponent
