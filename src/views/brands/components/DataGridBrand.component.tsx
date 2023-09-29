import "ka-table/style.css"
import {
   BrandApi,
   BrandSimpleDto,
   PaginatedResponseBrandSimpleDto,
} from "../../../api-services"
import { Box } from "@mantine/core"
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
import { errorNotification, successNotification } from "../../../utils"

export const DataGridBrandComponent = () => {
   const [data, setData] = useState<BrandSimpleDto[]>([])
   const [metadata, setMetadata] = useState<PaginatedResponseBrandSimpleDto>({
      totalNumber: 0,
      totalPage: 0,
      pageSize: 10,
      pageNumber: 0,
   })

   const table = useTable({
      onDispatch: async (action) => {
         if (
            action.type === ActionType.ComponentDidMount ||
            action.type === ActionType.LoadData
         ) {
            table.showLoading()
            const [err, jsonData] = await feature(
               getAPI(BrandApi).apiBrandBrandsGet(0, 10),
            )
            if (err) {
               errorNotification(err.message)
            } else {
               setData(jsonData.data.data.items)
               setMetadata({
                  totalNumber: jsonData.data.data.totalNumber,
                  totalPage: jsonData.data.data.totalPage,
                  pageNumber: jsonData.data.data.pageNumber,
                  pageSize: jsonData.data.data.pageSize,
               })
               successNotification()
            }
            table.hideLoading()
         }
         if (
            action.type === ActionType.UpdatePageIndex ||
            action.type === ActionType.UpdatePageSize
         ) {
            table.showLoading()
            const [err, jsonData] = await feature(
               getAPI(BrandApi).apiBrandBrandsGet(
                  action.pageIndex !== undefined
                     ? action.pageIndex
                     : table.props.paging.pageIndex,
                  action.pageSize !== undefined
                     ? action.pageSize
                     : table.props.paging.pageSize,
               ),
            )
            if (err) {
               errorNotification(err.message)
            } else {
               setData(jsonData.data.data.items)
               setMetadata({
                  totalNumber: jsonData.data.data.totalNumber,
                  totalPage: jsonData.data.data.totalPage,
                  pageNumber: jsonData.data.data.pageNumber,
                  pageSize: jsonData.data.data.pageSize,
               })
               successNotification()
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
               data={data}
               rowKeyField={"brandId"}
               sortingMode={SortingMode.Single}
               paging={{
                  enabled: true,
                  pageIndex: metadata.pageNumber,
                  pageSize: metadata.pageSize,
                  pageSizes: [10, 50, 100, 500],
                  pagesCount: metadata.totalPage,
                  position: PagingPosition.Bottom,
               }}
            />
         </Box>
      </>
   )
}
