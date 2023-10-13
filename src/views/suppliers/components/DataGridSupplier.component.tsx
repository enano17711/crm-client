import { useAtom, useAtomValue } from "jotai/index"
import {
   selectedSupplierAtom,
   supplierGridColumnsVisibleAtom,
   supplierGridParametersAtom,
} from "../../../store/supplier.atoms.ts"
import { useApiSupplierSuppliersGetHook } from "../../../api-gen/hooks/supplierController"
import DataTable, { SortOrder, TableColumn } from "react-data-table-component"
import { SupplierSimpleDto } from "../../../api-gen"
import React, { useCallback, useMemo } from "react"
import { Box } from "@mantine/core"

export const DataGridSupplierComponent = () => {
   const [supplierGridParameters, setSupplierGridParameters] = useAtom(
      supplierGridParametersAtom,
   )
   const [selectedSupplier, setSelectedSupplier] = useAtom(selectedSupplierAtom)
   const supplierGridColumnsVisible = useAtomValue(
      supplierGridColumnsVisibleAtom,
   )

   const {
      data: supplierQueryData,
      error: supplierQueryError,
      status: supplierQueryStatus,
   } = useApiSupplierSuppliersGetHook({
      ColumnName: supplierGridParameters.searchColumn,
      ColumnValue: supplierGridParameters.searchText,
      PageNumber: supplierGridParameters.pageIndex,
      PageSize: supplierGridParameters.pageSize,
      OrderBy: supplierGridParameters.orderBy,
      OrderDirection: supplierGridParameters.orderDirection,
   })

   const columns: TableColumn<SupplierSimpleDto>[] = useMemo(
      () => [
         {
            id: "name",
            name: "Nombre",
            selector: (row) => row.name,
            sortable: true,
            wrap: true,
            omit: supplierGridColumnsVisible.includes("name"),
            sortField: "Name",
         },
         {
            id: "description",
            name: "Descripcion",
            selector: (row) => row.description,
            sortable: true,
            wrap: true,
            omit: supplierGridColumnsVisible.includes("description"),
            sortField: "Description",
         },
      ],
      [supplierGridColumnsVisible],
   )

   const handleRowsPerPageChange = useCallback(
      (currentRowsPerPage: number, currentPage: number) => {
         setSupplierGridParameters((prev) => {
            return {
               ...prev,
               pageIndex: currentPage,
               pageSize: currentRowsPerPage,
            }
         })
      },
      [setSupplierGridParameters],
   )
   const handlePageChange = useCallback(
      (page: number) => {
         setSupplierGridParameters((prev) => {
            return {
               ...prev,
               pageIndex: page,
            }
         })
      },
      [setSupplierGridParameters],
   )
   const handleOnRowClicked = useCallback(
      (row: unknown) => {
         setSelectedSupplier(row as SupplierSimpleDto)
      },
      [setSelectedSupplier],
   )
   const handleOnSort = useCallback(
      (
         selectedColumn: TableColumn<SupplierSimpleDto>,
         sortDirection: SortOrder,
         sortedRows: unknown[],
      ) => {
         setSupplierGridParameters((prev) => {
            return {
               ...prev,
               orderBy: selectedColumn.sortField,
               orderDirection: sortDirection,
            }
         })
      },
      [setSupplierGridParameters],
   )

   const conditionalRowStyles = [
      {
         when: (row) => row.name === selectedSupplier.name,
         style: {
            backgroundColor: "#FFE8CC",
            color: "#FD7E14",
         },
      },
   ]

   return (
      <>
         <Box>
            <DataTable
               data={supplierQueryData?.data?.items}
               columns={columns}
               responsive
               pagination
               paginationPerPage={10}
               paginationRowsPerPageOptions={[10, 25, 50, 100]}
               paginationTotalRows={supplierQueryData?.data?.totalNumber}
               paginationServer
               onChangeRowsPerPage={handleRowsPerPageChange}
               onChangePage={handlePageChange}
               onRowClicked={handleOnRowClicked}
               conditionalRowStyles={conditionalRowStyles}
               progressPending={supplierQueryStatus === "loading"}
               onSort={handleOnSort}
               sortServer
            />
         </Box>
      </>
   )
}
