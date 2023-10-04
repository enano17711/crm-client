import "ka-table/style.css"
import { Box } from "@mantine/core"
import React, { useCallback, useMemo } from "react"
import { useApiBrandBrandsGetHook } from "../../../api-gen/hooks/brandController"
import DataTable, { TableColumn } from "react-data-table-component"
import { BrandSimpleDto } from "../../../api-gen"
import { useAtom, useAtomValue } from "jotai"
import {
   brandGridColumnsVisibleAtom,
   brandGridParametersAtom,
   selectedBrandAtom,
} from "../../../store/brand.atoms.ts"

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
         },
         {
            id: "description",
            name: "Descripcion",
            selector: (row) => row.description,
            sortable: true,
            wrap: true,
            omit: brandGridColumnsVisible.includes("description"),
         },
      ],
      [brandGridColumnsVisible],
   )
   const handleRowsPerPageChange = useCallback(
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
      (page: number, totalRows: number) => {
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
      (row: unknown, e: React.MouseEvent) => {
         setSelectedBrand(row as BrandSimpleDto)
      },
      [setSelectedBrand],
   )
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
            />
         </Box>
      </>
   )
}
