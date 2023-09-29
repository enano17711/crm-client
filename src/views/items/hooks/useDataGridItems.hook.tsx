import {
   BrandApi,
   BrandSimpleDto,
   ItemApi,
   ItemSimpleDto,
   PaginatedResponseItemSimpleDto,
} from "../../../api-services"
import { ActionType, useTable } from "ka-table"
import { feature, getAPI } from "../../../axios-utils.ts"
import { useState } from "react"
import { errorNotification, successNotification } from "../../../utils"

export const useDataGridItemsHook = () => {
   const [data, setData] = useState<ItemSimpleDto[]>([])
   const [searchColumn, setSearchColumn] = useState("")
   const [searchValue, setSearchValue] = useState("")
   const [metadata, setMetadata] = useState<PaginatedResponseItemSimpleDto>({
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
               getAPI(ItemApi).apiItemItemsGet(0, 10),
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
                  getAPI(ItemApi).apiItemItemsGet(
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
                  getAPI(ItemApi).apiItemItemsGet(
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
         if (action.type === ActionType.UpdateFilterRowValue) {
            setSearchColumn(action.columnKey)
            setSearchValue(action.filterRowValue)
            table.showLoading()
            const [err, jsonData] = await feature(
               getAPI(ItemApi).apiItemItemsGet(
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

   return {
      data,
      metadata,
      table,
   }
}
