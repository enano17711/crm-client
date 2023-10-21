import React, { useCallback, useMemo } from "react"
import { Box, Tabs } from "@mantine/core"
import { ItemBatchSimpleDto, ItemSimpleDto } from "../../../../api-gen"
import { useApiItemItemBatchesGetHook } from "../../../../api-gen/hooks/itemController"
import {
   itemBatchedGridParametersAtom,
   selectedItemBatchedAtom,
} from "../../../../store/itemBatch.atoms.ts"
import { useAtom } from "jotai"
import DataTable, { SortOrder, TableColumn } from "react-data-table-component"
import DataGridItemExpandedComponent from "../DataGridItemExpanded.component.tsx"

interface ItemBatchesTabComponentProps {
   data: ItemSimpleDto
}

const ItemBatchesTabComponent = ({ data }: ItemBatchesTabComponentProps) => {
   const [itemBatchGridParameters, setItemBatchGridParameters] = useAtom(
      itemBatchedGridParametersAtom,
   )
   const [selectedItemBatched, setSelectedItemBatched] = useAtom(
      selectedItemBatchedAtom,
   )

   const { data: itemQueryData, status: itemQueryStatus } =
      useApiItemItemBatchesGetHook({
         ColumnName: "ItemId",
         ColumnValue: data.itemId.toString(),
         PageNumber: itemBatchGridParameters.pageIndex,
         PageSize: itemBatchGridParameters.pageSize,
         OrderBy: "ItemBatchId",
         OrderDirection: "asc",
      })

   const columns: TableColumn<ItemBatchSimpleDto>[] = useMemo(
      () => [
         {
            id: "batchNumber",
            name: "Lote",
            selector: (row) => row.batchNumber,
            sortable: true,
            wrap: true,
            sortField: "BatchNumber",
         },
         {
            id: "batchDate",
            name: "Fecha de Vencimiento",
            selector: (row) => row.batchDate.toLocaleDateString(),
            sortable: true,
            wrap: true,
            sortField: "BatchDate",
         },
         {
            id: "quantity",
            selector: (row) => row.quantity,
            sortable: true,
            wrap: true,
            sortField: "Quantity",
         },
      ],
      [],
   )

   const handleRowsPerPageChange = useCallback(
      (currentRowsPerPage: number, currentPage: number) => {
         setItemBatchGridParameters((prev) => {
            return {
               ...prev,
               pageIndex: currentPage,
               pageSize: currentRowsPerPage,
            }
         })
      },
      [setItemBatchGridParameters],
   )
   const handlePageChange = useCallback(
      (page: number) => {
         setItemBatchGridParameters((prev) => {
            return {
               ...prev,
               pageIndex: page,
            }
         })
      },
      [setItemBatchGridParameters],
   )
   const handleOnRowClicked = useCallback(
      (row: unknown) => {
         setSelectedItemBatched(row as ItemBatchSimpleDto)
      },
      [setSelectedItemBatched],
   )
   const handleOnSort = useCallback(
      (
         selectedColumn: TableColumn<ItemBatchSimpleDto>,
         sortDirection: SortOrder,
         sortedRows: unknown[],
      ) => {
         setItemBatchGridParameters((prev) => {
            return {
               ...prev,
               orderBy: selectedColumn.sortField,
               orderDirection: sortDirection,
            }
         })
      },
      [setItemBatchGridParameters],
   )

   const conditionalRowStyles = [
      {
         when: (row) => row.name === selectedItemBatched.itemBatchId,
         style: {
            backgroundColor: "#FFE8CC",
            color: "#FD7E14",
         },
      },
   ]

   return (
      <Tabs.Panel value="first">
         <Box>
            <DataTable
               data={itemQueryData?.data?.items}
               columns={columns}
               responsive
               pagination
               paginationPerPage={10}
               paginationRowsPerPageOptions={[10, 25, 50, 100]}
               paginationTotalRows={itemQueryData?.data?.totalNumber}
               paginationServer
               onChangeRowsPerPage={handleRowsPerPageChange}
               onChangePage={handlePageChange}
               onRowClicked={handleOnRowClicked}
               conditionalRowStyles={conditionalRowStyles}
               progressPending={itemQueryStatus === "loading"}
               onSort={handleOnSort}
               sortServer
               expandableRows
               expandableRowsComponent={DataGridItemExpandedComponent}
            />
         </Box>
      </Tabs.Panel>
   )
}

export default ItemBatchesTabComponent
