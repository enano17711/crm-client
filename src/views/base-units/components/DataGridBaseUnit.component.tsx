import React, { useCallback, useMemo } from "react"
import { useAtom, useAtomValue } from "jotai/index"
import {
   baseUnitGridColumnsVisibleAtom,
   baseUnitGridParametersAtom,
   selectedBaseUnitAtom,
} from "../../../store/baseUnit.atoms.ts"
import { useApiBaseUnitBaseUnitsGetHook } from "../../../api-gen/hooks/baseUnitController"
import DataTable, { SortOrder, TableColumn } from "react-data-table-component"
import { BaseUnitSimpleDto } from "../../../api-gen"
import { Box } from "@mantine/core"

const DataGridBaseUnitComponent = () => {
   const [baseUnitGridParameters, setBaseUnitGridParameters] = useAtom(
      baseUnitGridParametersAtom,
   )
   const [selectedBaseUnit, setSelectedBaseUnit] = useAtom(selectedBaseUnitAtom)
   const baseUnitGridColumnsVisible = useAtomValue(
      baseUnitGridColumnsVisibleAtom,
   )

   const {
      data: baseUnitQueryData,
      error: baseUnitQueryError,
      status: baseUnitQueryStatus,
   } = useApiBaseUnitBaseUnitsGetHook({
      ColumnName: baseUnitGridParameters.searchColumn,
      ColumnValue: baseUnitGridParameters.searchText,
      PageNumber: baseUnitGridParameters.pageIndex,
      PageSize: baseUnitGridParameters.pageSize,
      OrderBy: baseUnitGridParameters.orderBy,
      OrderDirection: baseUnitGridParameters.orderDirection,
   })

   const columns: TableColumn<BaseUnitSimpleDto>[] = useMemo(
      () => [
         {
            id: "name",
            name: "Nombre",
            selector: (row) => row.name,
            sortable: true,
            wrap: true,
            omit: baseUnitGridColumnsVisible.includes("name"),
            sortField: "Name",
         },
         {
            id: "description",
            name: "Descripcion",
            selector: (row) => row.description,
            sortable: true,
            wrap: true,
            omit: baseUnitGridColumnsVisible.includes("description"),
            sortField: "Description",
         },
      ],
      [baseUnitGridColumnsVisible],
   )

   const handleRowsPerPageChange = useCallback(
      (currentRowsPerPage: number, currentPage: number) => {
         setBaseUnitGridParameters((prev) => {
            return {
               ...prev,
               pageIndex: currentPage,
               pageSize: currentRowsPerPage,
            }
         })
      },
      [setBaseUnitGridParameters],
   )
   const handlePageChange = useCallback(
      (page: number) => {
         setBaseUnitGridParameters((prev) => {
            return {
               ...prev,
               pageIndex: page,
            }
         })
      },
      [setBaseUnitGridParameters],
   )
   const handleOnRowClicked = useCallback(
      (row: unknown) => {
         setSelectedBaseUnit(row as BaseUnitSimpleDto)
      },
      [setSelectedBaseUnit],
   )
   const handleOnSort = useCallback(
      (
         selectedColumn: TableColumn<BaseUnitSimpleDto>,
         sortDirection: SortOrder,
         sortedRows: unknown[],
      ) => {
         setBaseUnitGridParameters((prev) => {
            return {
               ...prev,
               orderBy: selectedColumn.sortField,
               orderDirection: sortDirection,
            }
         })
      },
      [setBaseUnitGridParameters],
   )

   const conditionalRowStyles = [
      {
         when: (row) => row.name === selectedBaseUnit.name,
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
               data={baseUnitQueryData?.data?.items}
               columns={columns}
               responsive
               pagination
               paginationPerPage={10}
               paginationRowsPerPageOptions={[10, 25, 50, 100]}
               paginationTotalRows={baseUnitQueryData?.data?.totalNumber}
               paginationServer
               onChangeRowsPerPage={handleRowsPerPageChange}
               onChangePage={handlePageChange}
               onRowClicked={handleOnRowClicked}
               conditionalRowStyles={conditionalRowStyles}
               progressPending={baseUnitQueryStatus === "loading"}
               onSort={handleOnSort}
               sortServer
            />
         </Box>
      </>
   )
}

export default DataGridBaseUnitComponent
