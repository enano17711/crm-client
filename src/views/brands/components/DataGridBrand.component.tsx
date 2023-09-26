import "ka-table/style.css"
import {
   BrandApi,
   BrandDto,
   BrandSimpleDto,
   PaginatedResponseBrandSimpleDto,
} from "../../../api-services"
import { Box, Portal } from "@mantine/core"
import {
   ActionType,
   DataType,
   FilteringMode,
   PagingPosition,
   SortingMode,
   Table,
   useTable,
} from "ka-table"
import ActionsColumnComponent from "./ActionsColumn.component.tsx"
import React, { useState } from "react"
import { feature, getAPI } from "../../../axios-utils.ts"
import { notifications } from "@mantine/notifications"
import AddColumnComponent from "./AddColumn.component.tsx"
import SearchTextHeaderComponent from "../../../components/SearchTextHeader.component.tsx"

export const DataGridBrandComponent = () => {
   const [data, setData] = useState<BrandSimpleDto[]>([])
   const [searchColumn, setSearchColumn] = React.useState("")
   const [searchValue, setSearchValue] = React.useState("")
   const [metadata, setMetadata] = useState<PaginatedResponseBrandSimpleDto>({
      totalNumber: 0,
      totalPage: 0,
      pageSize: 10,
      pageNumber: 0,
   })
   const table = useTable({
      onDispatch: async (action) => {
         console.log(action)
         if (
            action.type === ActionType.ComponentDidMount ||
            action.type === ActionType.LoadData
         ) {
            console.log("entro en el primer fi")
            console.log(searchColumn)
            table.showLoading()
            const [err, jsonData] = await feature(
               getAPI(BrandApi).apiBrandBrandsGet(
                  0,
                  10,
                  searchColumn.trim() !== "" ? searchColumn : undefined,
                  searchValue.trim() !== "" ? searchValue : undefined,
               ),
            )
            if (err) {
               notifications.show({
                  title: "Operación Fallida",
                  message: err.message,
                  color: "red",
               })
            } else {
               setData(jsonData.data.data.items)
               setMetadata({
                  totalNumber: jsonData.data.data.totalNumber,
                  totalPage: jsonData.data.data.totalPage,
                  pageNumber: jsonData.data.data.pageNumber,
                  pageSize: jsonData.data.data.pageSize,
               })
               notifications.show({
                  title: "Operación Exitosa",
                  message: "Datos cargados con éxito",
                  color: "teal",
               })
            }
            table.hideLoading()
         }
         if (
            action.type === ActionType.UpdatePageIndex ||
            action.type === ActionType.UpdatePageSize
         ) {
            table.showLoading()
            let err = null
            let jsonData = null
            if (
               searchColumn !== null &&
               searchColumn !== undefined &&
               searchColumn.trim() !== "" &&
               searchValue !== null &&
               searchValue !== undefined &&
               searchValue.trim() !== ""
            ) {
               const [errTemp, jsonDataTemp] = await feature(
                  getAPI(BrandApi).apiBrandBrandsGet(
                     action.pageIndex !== undefined
                        ? action.pageIndex
                        : table.props.paging.pageIndex,
                     action.pageSize !== undefined
                        ? action.pageSize
                        : table.props.paging.pageSize,
                     searchColumn,
                     searchValue,
                  ),
               )
               err = errTemp
               jsonData = jsonDataTemp
            } else {
               const [errTemp, jsonDataTemp] = await feature(
                  getAPI(BrandApi).apiBrandBrandsGet(
                     action.pageIndex !== undefined
                        ? action.pageIndex
                        : table.props.paging.pageIndex,
                     action.pageSize !== undefined
                        ? action.pageSize
                        : table.props.paging.pageSize,
                  ),
               )
               err = errTemp
               jsonData = jsonDataTemp
            }
            if (err) {
               notifications.show({
                  title: "Operación Fallida",
                  message: err.message,
                  color: "red",
               })
            } else {
               setData(jsonData.data.data.items)
               setMetadata({
                  totalNumber: jsonData.data.data.totalNumber,
                  totalPage: jsonData.data.data.totalPage,
                  pageNumber: jsonData.data.data.pageNumber,
                  pageSize: jsonData.data.data.pageSize,
               })
               notifications.show({
                  title: "Operación Exitosa",
                  message: "Datos cargados con éxito",
                  color: "teal",
               })
            }
            table.hideLoading()
         }
         if (action.type === ActionType.UpdateFilterRowValue) {
            setSearchColumn(action.columnKey)
            setSearchValue(action.filterRowValue)

            table.showLoading()
            const [err, jsonData] = await feature(
               getAPI(BrandApi).apiBrandBrandsGet(
                  action.pageIndex !== undefined
                     ? action.pageIndex
                     : table.props.paging.pageIndex,
                  action.pageSize !== undefined
                     ? action.pageSize
                     : table.props.paging.pageSize,
                  action.columnKey,
                  action.filterRowValue,
               ),
            )
            if (err) {
               notifications.show({
                  title: "Operación Fallida",
                  message: err.message,
                  color: "red",
               })
            } else {
               setData(jsonData.data.data.items)
               setMetadata({
                  totalNumber: jsonData.data.data.totalNumber,
                  totalPage: jsonData.data.data.totalPage,
                  pageNumber: jsonData.data.data.pageNumber,
                  pageSize: jsonData.data.data.pageSize,
               })
               notifications.show({
                  title: "Operación Exitosa",
                  message: "Datos cargados con éxito",
                  color: "teal",
               })
            }
            table.hideLoading()
         }
      },
   })

   return (
      <>
         <Box>
            <Table
               table={table}
               columns={[
                  { key: "name", title: "Name", dataType: DataType.String },
                  {
                     key: "description",
                     title: "Description",
                     dataType: DataType.String,
                     filterRowValue: "",
                  },
                  {
                     key: "addData",
                     title: "Actions",
                     isEditable: false,
                     filterRowValue: "",
                     isFilterable: false,
                     isSortable: false,
                  },
               ]}
               data={data}
               rowKeyField={"brandId"}
               sortingMode={SortingMode.Single}
               filteringMode={FilteringMode.FilterRow}
               paging={{
                  enabled: true,
                  pageIndex: metadata.pageNumber,
                  pageSize: metadata.pageSize,
                  pageSizes: [10, 50, 100, 500],
                  pagesCount: metadata.totalPage,
                  position: PagingPosition.Bottom,
               }}
               childComponents={{
                  cellText: {
                     content: (props) => {
                        if (props.column.key === "addData") {
                           return <ActionsColumnComponent {...props} />
                        }
                     },
                  },
                  filterRowCell: {
                     content: (props) => {
                        switch (props.column.key) {
                           case "name":
                              return <SearchTextHeaderComponent {...props} />
                           case "description":
                              return <SearchTextHeaderComponent {...props} />
                        }
                     },
                  },
               }}
            />
         </Box>
         <Portal target={"#brand-header"}>
            <AddColumnComponent dispatch={table.dispatch} />
         </Portal>
      </>
   )
}
