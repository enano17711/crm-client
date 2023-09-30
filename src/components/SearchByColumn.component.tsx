import React, { useCallback } from "react"
import { NativeSelect, rem, TextInput } from "@mantine/core"
import { ITableInstance } from "ka-table"

interface SearchByColumnComponentProps {
   columns: { label: string; value: string }[]
   table: ITableInstance
   searchData: { column?: string; value?: string }
   setSearchData: (
      value:
         | ((prevState: { column?: string; value?: string }) => {
              column?: string
              value?: string
           })
         | { column?: string; value?: string },
   ) => void
}

const SearchByColumnComponent = ({
   columns,
   table,
   searchData,
   setSearchData,
}: SearchByColumnComponentProps) => {
   const onTextSearchChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
         /*const textToSearch = event.currentTarget.value.trim()
         if (textToSearch !== null && textToSearch !== undefined) {
            if (textToSearch !== "" && textToSearch.length > 2) {
               table.dispatch(search(`${searchColumnValue}-${textToSearch}`))
            }
         }
         if (textToSearch === "") {
            table.dispatch(search(`vacio`))
         }*/
      },
      [table],
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
         value={searchData.column}
         onChange={(event) =>
            setSearchData((prev) => ({
               ...prev,
               column: event.currentTarget.value,
            }))
         }
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
