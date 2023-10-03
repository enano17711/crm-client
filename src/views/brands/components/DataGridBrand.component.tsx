import "ka-table/style.css"
import { Box } from "@mantine/core"
import {
   ActionType,
   DataType,
   PagingPosition,
   SortingMode,
   Table,
   useTable,
} from "ka-table"
import React from "react"
import { kaPropsUtils } from "ka-table/utils"
import { useApiBrandBrandsGetHook } from "../../../api-gen/hooks/brandController"
import { useAtom, useSetAtom } from "jotai"
import {
   brandGridParametersAtom,
   selectedBrandAtom,
} from "../../../store/brand.atoms.ts"

export const DataGridBrandComponent = () => {
   const [brandGridParameters, setBrandGridParameters] = useAtom(
      brandGridParametersAtom,
   )
   const setSelectedBrand = useSetAtom(selectedBrandAtom)

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

   const table = useTable({
      onDispatch: async (action, tableProps) => {
         if (action.type === ActionType.SelectSingleRow) {
            const selected = kaPropsUtils.getSelectedData(tableProps).pop()
            setSelectedBrand(selected)
         }
         if (action.type === ActionType.UpdatePageIndex) {
            setBrandGridParameters((prev) => {
               return {
                  ...prev,
                  pageIndex: action.pageIndex,
               }
            })
         }
         if (action.type === ActionType.UpdatePageSize) {
            setBrandGridParameters((prev) => {
               return {
                  ...prev,
                  pageSize: action.pageSize,
               }
            })
         }
      },
   })

   return (
      <>
         <Box>
            <Table
               table={table}
               columns={[
                  {
                     key: "name",
                     title: "Name",
                     dataType: DataType.String,
                     filterRowValue: "",
                  },
                  {
                     key: "description",
                     title: "Description",
                     dataType: DataType.String,
                     filterRowValue: "",
                  },
               ]}
               data={brandQueryData?.data?.items}
               rowKeyField={"brandId"}
               loading={{
                  enabled: brandQueryStatus === "loading",
               }}
               sortingMode={SortingMode.Single}
               paging={{
                  enabled: true,
                  pageIndex: brandQueryData?.data?.pageNumber,
                  pageSize: brandQueryData?.data?.pageSize,
                  pageSizes: [10, 50, 100, 500],
                  pagesCount: brandQueryData?.data?.totalPage,
                  position: PagingPosition.Bottom,
               }}
               childComponents={{
                  dataRow: {
                     elementAttributes: () => ({
                        onClick: (event, extendedEvent) => {
                           table.selectSingleRow(
                              extendedEvent.childProps.rowKeyValue,
                           )
                        },
                     }),
                  },
               }}
            />
         </Box>
      </>
   )
}
