import { Box } from "@mantine/core"
import { useDataGridItemsHook } from "../hooks/useDataGridItems.hook.tsx"
import {
   DataType,
   FilteringMode,
   PagingPosition,
   SortingMode,
   Table,
} from "ka-table"
import React from "react"
import ItemActionsColumnComponent from "./ItemActionsColumn.component.tsx"
import ItemAddColumnComponent from "./ItemAddColumn.component.tsx"
import SearchTextHeaderComponent from "../../../components/SearchTextHeader.component.tsx"

export const DataGridItemComponent = () => {
   const { data, table, metadata } = useDataGridItemsHook()
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
                     key: "code",
                     title: "Code",
                     dataType: DataType.String,
                     filterRowValue: "",
                  },
                  {
                     key: "price",
                     title: "Price",
                     dataType: DataType.Number,
                     filterRowValue: "",
                  },
                  {
                     key: "cost",
                     title: "Cost",
                     dataType: DataType.Number,
                     filterRowValue: "",
                  },
                  {
                     key: "quantity",
                     title: "Quantity",
                     dataType: DataType.Number,
                     filterRowValue: "",
                  },
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
                     width: 150,
                  },
               ]}
               data={data}
               rowKeyField={"itemId"}
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
                           return <ItemActionsColumnComponent {...props} />
                        }
                     },
                  },
                  headCell: {
                     content: (props) => {
                        if (props.column.key === "addData") {
                           return <ItemAddColumnComponent {...props} />
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
      </>
   )
}
