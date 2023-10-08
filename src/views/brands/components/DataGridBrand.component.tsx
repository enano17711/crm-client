import "ka-table/style.css"
import { Box } from "@mantine/core"
import React, { useMemo } from "react"
import { useApiBrandBrandsGetHook } from "../../../api-gen/hooks/brandController"
import DataTable, { TableColumn } from "react-data-table-component"
import { BrandSimpleDto } from "../../../api-gen"
import { useAtom, useAtomValue } from "jotai"
import {
   brandGridColumnsVisibleAtom,
   brandGridParametersAtom,
   selectedBrandAtom,
} from "../../../store/brand.atoms.ts"
import { useDataGrid } from "../../../hooks/useDataGrid.hook.tsx"

export const DataGridBrandComponent = () => {
   const [brandGridParameters, setBrandGridParameters] = useAtom(
      brandGridParametersAtom,
   )
   const [selectedBrand, setSelectedBrand] = useAtom(selectedBrandAtom)
   const brandGridColumnsVisible = useAtomValue(brandGridColumnsVisibleAtom)

   const {
      data: brandQueryData,
      error: brandQueryError,
      status: brandQueryStatus,
   } = useApiBrandBrandsGetHook({
      ColumnName: brandGridParameters.searchColumn,
      ColumnValue: brandGridParameters.searchText,
      PageNumber: brandGridParameters.pageIndex,
      PageSize: brandGridParameters.pageSize,
      OrderBy: brandGridParameters.orderBy,
      OrderDirection: brandGridParameters.orderDirection,
   })

   const columns: TableColumn<BrandSimpleDto>[] = useMemo(
      () => [
         {
            id: "name",
            name: "Nombre",
            selector: (row) => row.name,
            sortable: true,
            wrap: true,
            omit: brandGridColumnsVisible.includes("name"),
            sortField: "Name",
         },
         {
            id: "description",
            name: "Descripcion",
            selector: (row) => row.description,
            sortable: true,
            wrap: true,
            omit: brandGridColumnsVisible.includes("description"),
            sortField: "Description",
         },
      ],
      [brandGridColumnsVisible],
   )

   const {
      handlePageChange,
      handleRowsPerPageChange,
      handleOnRowClicked,
      handleOnSort,
   } = useDataGrid(setBrandGridParameters, setSelectedBrand)
   /*   const handleRowsPerPageChange = useCallback(
      (currentRowsPerPage: number, currentPage: number) => {
         setBrandGridParameters((prev) => {
            return {
               ...prev,
               pageIndex: currentPage,
               pageSize: currentRowsPerPage,
            }
         })
      },
      [setBrandGridParameters],
   )
   const handlePageChange = useCallback(
      (page: number) => {
         setBrandGridParameters((prev) => {
            return {
               ...prev,
               pageIndex: page,
            }
         })
      },
      [setBrandGridParameters],
   )
   const handleOnRowClicked = useCallback(
      (row: unknown) => {
         setSelectedBrand(row as BrandSimpleDto)
      },
      [setSelectedBrand],
   )
   const handleOnSort = useCallback(
      (
         selectedColumn: TableColumn<BrandSimpleDto>,
         sortDirection: SortOrder,
         sortedRows: unknown[],
      ) => {
         console.log(selectedColumn, sortDirection, sortedRows)
         setBrandGridParameters((prev) => {
            return {
               ...prev,
               orderBy: selectedColumn.sortField,
               orderDirection: sortDirection,
            }
         })
      },
      [setBrandGridParameters],
   )*/

   const conditionalRowStyles = [
      {
         when: (row) => row.name === selectedBrand.name,
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
               data={brandQueryData?.data?.items}
               columns={columns}
               responsive
               pagination
               paginationPerPage={10}
               paginationRowsPerPageOptions={[10, 25, 50, 100]}
               paginationTotalRows={brandQueryData?.data?.totalNumber}
               paginationServer
               onChangeRowsPerPage={handleRowsPerPageChange}
               onChangePage={handlePageChange}
               onRowClicked={handleOnRowClicked}
               conditionalRowStyles={conditionalRowStyles}
               progressPending={brandQueryStatus === "loading"}
               onSort={handleOnSort}
               sortServer
            />
         </Box>
      </>
   )
}
