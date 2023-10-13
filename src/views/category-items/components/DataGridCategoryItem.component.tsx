import { useAtom, useAtomValue } from "jotai"
import {
   categoryItemGridColumnsVisibleAtom,
   categoryItemGridParametersAtom,
   selectedCategoryItemAtom,
} from "../../../store/categoryItem.atoms.ts"
import DataTable, { SortOrder, TableColumn } from "react-data-table-component"
import React, { useCallback, useMemo } from "react"
import { Box } from "@mantine/core"
import { CategoryItemSimpleDto } from "../../../api-gen"
import { useApiCategoryItemCategoryItemsGetHook } from "../../../api-gen/hooks/categoryItemController"

export const DataGridCategoryItemComponent = () => {
   const [categoryItemGridParameters, setCategoryItemGridParameters] = useAtom(
      categoryItemGridParametersAtom,
   )
   const [selectedCategoryItem, setSelectedCategoryItem] = useAtom(
      selectedCategoryItemAtom,
   )
   const categoryItemGridColumnsVisible = useAtomValue(
      categoryItemGridColumnsVisibleAtom,
   )

   const {
      data: categoryItemQueryData,
      error: categoryItemQueryError,
      status: categoryItemQueryStatus,
   } = useApiCategoryItemCategoryItemsGetHook({
      ColumnName: categoryItemGridParameters.searchColumn,
      ColumnValue: categoryItemGridParameters.searchText,
      PageNumber: categoryItemGridParameters.pageIndex,
      PageSize: categoryItemGridParameters.pageSize,
      OrderBy: categoryItemGridParameters.orderBy,
      OrderDirection: categoryItemGridParameters.orderDirection,
   })

   const columns: TableColumn<CategoryItemSimpleDto>[] = useMemo(
      () => [
         {
            id: "name",
            name: "Nombre",
            selector: (row) => row.name,
            sortable: true,
            wrap: true,
            omit: categoryItemGridColumnsVisible.includes("name"),
            sortField: "Name",
         },
         {
            id: "description",
            name: "Descripcion",
            selector: (row) => row.description,
            sortable: true,
            wrap: true,
            omit: categoryItemGridColumnsVisible.includes("description"),
            sortField: "Description",
         },
      ],
      [categoryItemGridColumnsVisible],
   )

   const handleRowsPerPageChange = useCallback(
      (currentRowsPerPage: number, currentPage: number) => {
         setCategoryItemGridParameters((prev) => {
            return {
               ...prev,
               pageIndex: currentPage,
               pageSize: currentRowsPerPage,
            }
         })
      },
      [setCategoryItemGridParameters],
   )
   const handlePageChange = useCallback(
      (page: number) => {
         setCategoryItemGridParameters((prev) => {
            return {
               ...prev,
               pageIndex: page,
            }
         })
      },
      [setCategoryItemGridParameters],
   )
   const handleOnRowClicked = useCallback(
      (row: unknown) => {
         setSelectedCategoryItem(row as CategoryItemSimpleDto)
      },
      [setSelectedCategoryItem],
   )
   const handleOnSort = useCallback(
      (
         selectedColumn: TableColumn<CategoryItemSimpleDto>,
         sortDirection: SortOrder,
         sortedRows: unknown[],
      ) => {
         setCategoryItemGridParameters((prev) => {
            return {
               ...prev,
               orderBy: selectedColumn.sortField,
               orderDirection: sortDirection,
            }
         })
      },
      [setCategoryItemGridParameters],
   )

   const conditionalRowStyles = [
      {
         when: (row) => row.name === selectedCategoryItem.name,
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
               data={categoryItemQueryData?.data?.items}
               columns={columns}
               responsive
               pagination
               paginationPerPage={10}
               paginationRowsPerPageOptions={[10, 25, 50, 100]}
               paginationTotalRows={categoryItemQueryData?.data?.totalNumber}
               paginationServer
               onChangeRowsPerPage={handleRowsPerPageChange}
               onChangePage={handlePageChange}
               onRowClicked={handleOnRowClicked}
               conditionalRowStyles={conditionalRowStyles}
               progressPending={categoryItemQueryStatus === "loading"}
               onSort={handleOnSort}
               sortServer
            />
         </Box>
      </>
   )
}
