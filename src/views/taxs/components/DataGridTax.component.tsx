import { useAtom, useAtomValue } from "jotai"
import {
   selectedTaxAtom,
   taxGridColumnsVisibleAtom,
   taxGridParametersAtom,
} from "../../../store/tax.atoms.ts"
import { useApiTaxTaxsGetHook } from "../../../api-gen/hooks/taxController"
import DataTable, { SortOrder, TableColumn } from "react-data-table-component"
import { TaxSimpleDto } from "../../../api-gen"
import React, { useCallback, useMemo } from "react"
import { Box } from "@mantine/core"

export const DataGridTaxComponent = () => {
   const [taxGridParameters, setTaxGridParameters] = useAtom(
      taxGridParametersAtom,
   )
   const [selectedTax, setSelectedTax] = useAtom(selectedTaxAtom)
   const taxGridColumnsVisible = useAtomValue(taxGridColumnsVisibleAtom)

   const {
      data: taxQueryData,
      error: taxQueryError,
      status: taxQueryStatus,
   } = useApiTaxTaxsGetHook({
      ColumnName: taxGridParameters.searchColumn,
      ColumnValue: taxGridParameters.searchText,
      PageNumber: taxGridParameters.pageIndex,
      PageSize: taxGridParameters.pageSize,
      OrderBy: taxGridParameters.orderBy,
      OrderDirection: taxGridParameters.orderDirection,
   })

   const columns: TableColumn<TaxSimpleDto>[] = useMemo(
      () => [
         {
            id: "name",
            name: "Nombre",
            selector: (row) => row.name,
            sortable: true,
            wrap: true,
            omit: taxGridColumnsVisible.includes("name"),
            sortField: "Name",
         },
         {
            id: "rate",
            name: "Tasa",
            selector: (row) => row.rate,
            sortable: true,
            wrap: true,
            omit: taxGridColumnsVisible.includes("rate"),
            sortField: "Rate",
         },
         {
            id: "description",
            name: "Descripción",
            selector: (row) => row.description,
            sortable: true,
            wrap: true,
            omit: taxGridColumnsVisible.includes("description"),
            sortField: "Description",
         },
      ],
      [taxGridColumnsVisible],
   )

   const handleRowsPerPageChange = useCallback(
      (currentRowsPerPage: number, currentPage: number) => {
         setTaxGridParameters((prev) => {
            return {
               ...prev,
               pageIndex: currentPage,
               pageSize: currentRowsPerPage,
            }
         })
      },
      [setTaxGridParameters],
   )
   const handlePageChange = useCallback(
      (page: number) => {
         setTaxGridParameters((prev) => {
            return {
               ...prev,
               pageIndex: page,
            }
         })
      },
      [setTaxGridParameters],
   )
   const handleOnRowClicked = useCallback(
      (row: unknown) => {
         setSelectedTax(row as TaxSimpleDto)
      },
      [setSelectedTax],
   )
   const handleOnSort = useCallback(
      (
         selectedColumn: TableColumn<TaxSimpleDto>,
         sortDirection: SortOrder,
         sortedRows: unknown[],
      ) => {
         setTaxGridParameters((prev) => {
            return {
               ...prev,
               orderBy: selectedColumn.sortField,
               orderDirection: sortDirection,
            }
         })
      },
      [setTaxGridParameters],
   )

   const conditionalRowStyles = [
      {
         when: (row) => row.name === selectedTax.name,
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
               data={taxQueryData?.data?.items}
               columns={columns}
               responsive
               pagination
               paginationPerPage={10}
               paginationRowsPerPageOptions={[10, 25, 50, 100]}
               paginationTotalRows={taxQueryData?.data?.totalNumber}
               paginationServer
               onChangeRowsPerPage={handleRowsPerPageChange}
               onChangePage={handlePageChange}
               onRowClicked={handleOnRowClicked}
               conditionalRowStyles={conditionalRowStyles}
               progressPending={taxQueryStatus === "loading"}
               onSort={handleOnSort}
               sortServer
            />
         </Box>
      </>
   )
}
