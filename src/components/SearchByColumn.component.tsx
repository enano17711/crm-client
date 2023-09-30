import React, { useCallback, useState } from "react"
import { NativeSelect, rem, TextInput } from "@mantine/core"
import { ITableInstance } from "ka-table"
import { search } from "ka-table/actionCreators"

interface SearchByColumnComponentProps {
   columns: { label: string; value: string }[]
   table: ITableInstance
}

const SearchByColumnComponent = ({
   columns,
   table,
}: SearchByColumnComponentProps) => {
   const [searchColumnValue, setSearchColumnValue] = useState(columns[0].value)

   const onTextSearchChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
         const textToSearch = event.currentTarget.value.trim()
         if (textToSearch !== null && textToSearch !== undefined) {
            if (textToSearch !== "" && textToSearch.length > 2) {
               table.dispatch(search(`${searchColumnValue}-${textToSearch}`))
            }
         }
         if (textToSearch === "") {
            table.dispatch(search(`vacio`))
         }
      },
      [table, searchColumnValue],
   )

   const select = (
      <NativeSelect
         data={columns}
         rightSectionWidth={28}
         styles={{
            input: {
               fontWeight: 500,
               borderTopLeftRadius: 0,
               borderBottomLeftRadius: 0,
               width: rem(92),
               marginRight: rem(-2),
            },
         }}
         value={searchColumnValue}
         onChange={(event) => setSearchColumnValue(event.currentTarget.value)}
      />
   )

   return (
      <TextInput
         placeholder="Data to search"
         rightSection={select}
         rightSectionWidth={92}
         onChange={onTextSearchChange}
      />
   )
}

export default SearchByColumnComponent
