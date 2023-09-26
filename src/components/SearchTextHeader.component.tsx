import React from "react"
import { TextInput } from "@mantine/core"
import { IFilterRowEditorProps } from "ka-table/props"
import { updateFilterRowValue } from "ka-table/actionCreators"

const SearchTextHeaderComponent = (props: IFilterRowEditorProps) => {
   return (
      <TextInput
         placeholder="Buscar..."
         defaultValue={props.column.filterRowValue}
         onChange={(event) => {
            const filterValue = event.currentTarget.value.trim()
               ? event.currentTarget.value.trim()
               : undefined
            props.dispatch(updateFilterRowValue(props.column.key, filterValue))
         }}
      ></TextInput>
   )
}

export default SearchTextHeaderComponent
