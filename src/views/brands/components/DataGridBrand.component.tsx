import "ka-table/style.css"
import { BrandApi, BrandDto } from "../../../api-services"
import { Box } from "@mantine/core"
import {
   ActionType,
   DataType,
   EditingMode,
   PagingPosition,
   SortingMode,
   Table,
   useTable,
} from "ka-table"
import ActionsColumnComponent from "./ActionsColumn.component.tsx"
import { useState } from "react"
import { feature, getAPI } from "../../../axios-utils.ts"
import { notifications } from "@mantine/notifications"
import AddColumnComponent from "./AddColumn.component.tsx"

export const DataGridBrandComponent = () => {
   const [data, setData] = useState<BrandDto[]>([])
   const table = useTable({
      onDispatch: async (action) => {
         console.log(action.type)
         if (
            action.type === ActionType.ComponentDidMount ||
            action.type === ActionType.LoadData
         ) {
            table.showLoading()
            const [err, jsonData] = await feature(
               getAPI(BrandApi).apiBrandBrandsGet(),
            )
            if (err) {
               notifications.show({
                  title: "Operación Fallida",
                  message: err.message,
                  color: "red",
               })
            } else {
               setData(jsonData.data.data.items)
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
      <Box>
         <Table
            table={table}
            columns={[
               { key: "name", title: "Name", dataType: DataType.String },
               {
                  key: "description",
                  title: "Description",
                  dataType: DataType.String,
               },
               {
                  key: "addData",
                  isEditable: false,
               },
            ]}
            data={data}
            editingMode={EditingMode.Cell}
            rowKeyField={"brandId"}
            sortingMode={SortingMode.Single}
            paging={{
               enabled: true,
               pageIndex: 0,
               pageSize: 5,
               pageSizes: [5, 10, 50, 100],
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
               headCell: {
                  content: (props) => {
                     if (props.column.key === "addData") {
                        return <AddColumnComponent {...props} />
                     }
                  },
               },
            }}
         />
      </Box>
   )
}
