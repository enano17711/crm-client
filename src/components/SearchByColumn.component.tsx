import React from "react"
import { NativeSelect, rem, TextInput } from "@mantine/core"
import { ITableInstance } from "ka-table"

interface SearchByColumnComponentProps {
   columns: { label: string; value: string }[]
   table: ITableInstance
}

const SearchByColumnComponent = ({
   columns,
   table,
}: SearchByColumnComponentProps) => {
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
      />
   )

   return (
      <TextInput
         type="number"
         placeholder="Data to search"
         rightSection={select}
         rightSectionWidth={92}
      />
   )
}

export default SearchByColumnComponent
