import { Box } from "@mantine/core"
import React, { useCallback, useMemo } from "react"
import { useApiUnitUnitsGetHook } from "../../../api-gen/hooks/unitController"
import { useAtom, useAtomValue } from "jotai"
import {
   selectedUnitAtom,
   unitGridColumnsVisibleAtom,
   unitGridParametersAtom,
} from "../../../store/unit.atoms.ts"
import DataTable, { SortOrder, TableColumn } from "react-data-table-component"
import { UnitDto } from "../../../api-gen"

export const DataGridUnitComponent = () => {
   const [unitGridParameters, setUnitGridParameters] = useAtom(
      unitGridParametersAtom,
   )
   const [selectedUnit, setSelectedUnit] = useAtom(selectedUnitAtom)
   const unitGridColumnsVisible = useAtomValue(unitGridColumnsVisibleAtom)

   const {
      data: unitQueryData,
      error: unitQueryError,
      status: unitQueryStatus,
   } = useApiUnitUnitsGetHook({
      ColumnName: unitGridParameters.searchColumn,
      ColumnValue: unitGridParameters.searchText,
      PageNumber: unitGridParameters.pageIndex,
      PageSize: unitGridParameters.pageSize,
      OrderBy: unitGridParameters.orderBy,
      OrderDirection: unitGridParameters.orderDirection,
   })

   const columns: TableColumn<UnitDto>[] = useMemo(
      () => [
         {
            id: "name",
            name: "Nombre",
            selector: (row) => row.name,
            sortable: true,
            wrap: true,
            omit: unitGridColumnsVisible.includes("name"),
            sortField: "Name",
         },
         {
            id: "code",
            name: "Código",
            selector: (row) => row.code,
            sortable: true,
            wrap: true,
            omit: unitGridColumnsVisible.includes("code"),
            sortField: "Code",
         },
         {
            id: "baseUnit",
            name: "U. Base",
            selector: (row) => row.baseUnit?.name,
            wrap: true,
            omit: unitGridColumnsVisible.includes("baseUnit"),
         },
         {
            id: "operation",
            name: "Operación",
            selector: (row) => row.operation,
            wrap: true,
            omit: unitGridColumnsVisible.includes("operation"),
         },
         {
            id: "value",
            name: "Valor",
            selector: (row) => row.value,
            wrap: true,
            omit: unitGridColumnsVisible.includes("value"),
         },
         {
            id: "description",
            name: "Descripción",
            selector: (row) => row.description,
            sortable: true,
            wrap: true,
            omit: unitGridColumnsVisible.includes("description"),
            sortField: "Description",
         },
      ],
      [unitGridColumnsVisible],
   )

   const handleRowsPerPageChange = useCallback(
      (currentRowsPerPage: number, currentPage: number) => {
         setUnitGridParameters((prev) => {
            return {
               ...prev,
               pageIndex: currentPage,
               pageSize: currentRowsPerPage,
            }
         })
      },
      [setUnitGridParameters],
   )
   const handlePageChange = useCallback(
      (page: number) => {
         setUnitGridParameters((prev) => {
            return {
               ...prev,
               pageIndex: page,
            }
         })
      },
      [setUnitGridParameters],
   )
   const handleOnRowClicked = useCallback(
      (row: unknown) => {
         setSelectedUnit(row as UnitDto)
      },
      [setSelectedUnit],
   )
   const handleOnSort = useCallback(
      (
         selectedColumn: TableColumn<UnitDto>,
         sortDirection: SortOrder,
         sortedRows: unknown[],
      ) => {
         setUnitGridParameters((prev) => {
            return {
               ...prev,
               orderBy: selectedColumn.sortField,
               orderDirection: sortDirection,
            }
         })
      },
      [setUnitGridParameters],
   )

   const conditionalRowStyles = [
      {
         when: (row) => row.name === selectedUnit.name,
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
               data={unitQueryData?.data?.items}
               columns={columns}
               responsive
               pagination
               paginationPerPage={10}
               paginationRowsPerPageOptions={[10, 25, 50, 100]}
               paginationTotalRows={unitQueryData?.data?.totalNumber}
               paginationServer
               onChangeRowsPerPage={handleRowsPerPageChange}
               onChangePage={handlePageChange}
               onRowClicked={handleOnRowClicked}
               conditionalRowStyles={conditionalRowStyles}
               progressPending={unitQueryStatus === "loading"}
               onSort={handleOnSort}
               sortServer
            />
         </Box>
      </>
   )
}
