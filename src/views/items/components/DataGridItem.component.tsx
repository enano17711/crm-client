import React, { useCallback, useMemo } from "react"
import { useAtom, useAtomValue } from "jotai"
import {
   itemGridColumnsVisibleAtom,
   itemGridParametersAtom,
   selectedItemAtom,
} from "../../../store/item.atoms.ts"
import { useApiItemItemsGetHook } from "../../../api-gen/hooks/itemController"
import DataTable, { SortOrder, TableColumn } from "react-data-table-component"
import { ItemSimpleDto } from "../../../api-gen"
import { Box } from "@mantine/core"

const DataGridItemComponent = () => {
   const [itemGridParameters, setItemGridParameters] = useAtom(
      itemGridParametersAtom,
   )
   const [selectedItem, setSelectedItem] = useAtom(selectedItemAtom)
   const itemGridColumnsVisible = useAtomValue(itemGridColumnsVisibleAtom)

   const {
      data: itemQueryData,
      error: itemQueryError,
      status: itemQueryStatus,
   } = useApiItemItemsGetHook({
      ColumnName: itemGridParameters.searchColumn,
      ColumnValue: itemGridParameters.searchText,
      PageNumber: itemGridParameters.pageIndex,
      PageSize: itemGridParameters.pageSize,
      OrderBy: itemGridParameters.orderBy,
      OrderDirection: itemGridParameters.orderDirection,
   })

   const columns: TableColumn<ItemSimpleDto>[] = useMemo(
      () => [
         {
            id: "name",
            name: "Nombre",
            selector: (row) => row.name,
            sortable: true,
            wrap: true,
            omit: itemGridColumnsVisible.includes("name"),
            sortField: "Name",
         },
         {
            id: "code",
            name: "Código",
            selector: (row) => row.code,
            sortable: true,
            wrap: true,
            omit: itemGridColumnsVisible.includes("code"),
            sortField: "Code",
         },
         {
            id: "brand",
            name: "Marca",
            selector: (row) => row.brand?.name,
            wrap: true,
            omit: itemGridColumnsVisible.includes("brand"),
         },
         {
            id: "isBatched",
            name: "En lote",
            selector: (row) => row.isBatched,
            sortable: true,
            wrap: true,
            omit: itemGridColumnsVisible.includes("isBatched"),
            sortField: "IsBatched",
         },
         {
            id: "unitPrice",
            name: "Unidad de Venta",
            selector: (row) => row.unitPrice?.name,
            wrap: true,
            omit: itemGridColumnsVisible.includes("unitPrice"),
         },
         {
            id: "price",
            name: "Precio",
            selector: (row) => row.price,
            sortable: true,
            wrap: true,
            omit: itemGridColumnsVisible.includes("price"),
            sortField: "Price",
         },
         {
            id: "unitCost",
            name: "Unidad de Compra",
            selector: (row) => row.unitCost?.name,
            wrap: true,
            omit: itemGridColumnsVisible.includes("unitCost"),
         },
         {
            id: "cost",
            name: "Costo",
            selector: (row) => row.cost,
            sortable: true,
            wrap: true,
            omit: itemGridColumnsVisible.includes("cost"),
            sortField: "Cost",
         },
         {
            id: "quantity",
            name: "Cantidad",
            selector: (row) => row.quantity,
            sortable: true,
            wrap: true,
            omit: itemGridColumnsVisible.includes("quantity"),
            sortField: "Quantity",
         },
         {
            id: "taxCostMethod",
            name: "Metodo Impuesto Compra",
            selector: (row) => row.taxCostMethod,
            sortable: true,
            wrap: true,
            omit: itemGridColumnsVisible.includes("taxCostMethod"),
            sortField: "TaxCostMethod",
         },
         {
            id: "taxCost",
            name: "Impuesto Compra (%)",
            selector: (row) => row.taxCost?.rate,
            sortable: true,
            wrap: true,
            omit: itemGridColumnsVisible.includes("taxCost"),
            sortField: "TaxCost",
         },
         {
            id: "taxPriceMethod",
            name: "Metodo Impuesto Precio",
            selector: (row) => row.taxPriceMethod,
            sortable: true,
            wrap: true,
            omit: itemGridColumnsVisible.includes("taxPriceMethod"),
            sortField: "TaxPriceMethod",
         },
         {
            id: "taxPrice",
            name: "Impuesto Precio (%)",
            selector: (row) => row.taxPrice?.rate,
            sortable: true,
            wrap: true,
            omit: itemGridColumnsVisible.includes("taxPrice"),
            sortField: "TaxPrice",
         },
         {
            id: "description",
            name: "Descripción",
            selector: (row) => row.description,
            wrap: true,
            omit: itemGridColumnsVisible.includes("description"),
         },
      ],
      [itemGridColumnsVisible],
   )

   const handleRowsPerPageChange = useCallback(
      (currentRowsPerPage: number, currentPage: number) => {
         setItemGridParameters((prev) => {
            return {
               ...prev,
               pageIndex: currentPage,
               pageSize: currentRowsPerPage,
            }
         })
      },
      [setItemGridParameters],
   )
   const handlePageChange = useCallback(
      (page: number) => {
         setItemGridParameters((prev) => {
            return {
               ...prev,
               pageIndex: page,
            }
         })
      },
      [setItemGridParameters],
   )
   const handleOnRowClicked = useCallback(
      (row: unknown) => {
         setSelectedItem(row as ItemSimpleDto)
      },
      [setSelectedItem],
   )
   const handleOnSort = useCallback(
      (
         selectedColumn: TableColumn<ItemSimpleDto>,
         sortDirection: SortOrder,
         sortedRows: unknown[],
      ) => {
         setItemGridParameters((prev) => {
            return {
               ...prev,
               orderBy: selectedColumn.sortField,
               orderDirection: sortDirection,
            }
         })
      },
      [setItemGridParameters],
   )

   const conditionalRowStyles = [
      {
         when: (row) => row.name === selectedItem.name,
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
      </>
   )
}

export default DataGridItemComponent
