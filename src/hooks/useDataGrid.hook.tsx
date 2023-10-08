import { useCallback } from "react"
import { BrandSimpleDto } from "../api-gen"
import { SortOrder, TableColumn } from "react-data-table-component"

export const useDataGrid = (
   setBrandGridParameters: (
      args:
         | ((prev: {
              searchColumn: string
              searchText: string
              pageIndex: number
              pageSize: number
              orderBy: string
              orderDirection: "asc" | "desc"
           }) => {
              searchColumn: string
              searchText: string
              pageIndex: number
              pageSize: number
              orderBy: string
              orderDirection: "asc" | "desc"
           })
         | {
              searchColumn: string
              searchText: string
              pageIndex: number
              pageSize: number
              orderBy: string
              orderDirection: "asc" | "desc"
           },
   ) => void,
   setSelectedBrand: (
      args: ((prev: BrandSimpleDto) => BrandSimpleDto) | BrandSimpleDto,
   ) => void,
) => {
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
   )

   return {
      handleRowsPerPageChange,
      handlePageChange,
      handleOnRowClicked,
      handleOnSort,
   }
}
