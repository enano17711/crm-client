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
         OrderBy: itemBatchGridParameters.orderBy,
         OrderDirection: itemBatchGridParameters.orderDirection,
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
            selector: (row) => new Date(row.batchDate).toLocaleDateString(),
            sortable: true,
            wrap: true,
            sortField: "BatchDate",
         },
         {
            id: "quantity",
            name: "Cantidad",
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
         console.log("entro en el row clicked: ", row)
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
         console.log("entro en el sort")
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
         when: (row) => row.batchNumber === selectedItemBatched.batchNumber,
         style: {
            backgroundColor: "#F3D9FA",
            color: "#BE4BDB",
         },
      },
   ]

   /*   useEffect(() => {
      setSelectedItemBatched({})
   }, [])*/

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
            />
         </Box>
      </Tabs.Panel>
   )
}

export default ItemBatchesTabComponent
