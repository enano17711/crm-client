import React, { useCallback, useState } from "react"
import { NativeSelect, rem, TextInput } from "@mantine/core"
import { brandGridParametersAtom } from "../../../store/brand.atoms.ts"
import { useSetAtom } from "jotai"

const columns = [
   {
      value: "Name",
      label: "Name",
   },
   {
      value: "Description",
      label: "Description",
   },
]
const SearchBrandByColumnComponent = () => {
   const [columnSelected, setColumnSelected] = useState("Name")
   const setBrandGridParameters = useSetAtom(brandGridParametersAtom)

   const onTextSearchChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
         const textToSearch = event.currentTarget.value.trim()
         if (textToSearch !== null && textToSearch !== undefined) {
            if (textToSearch !== "" && textToSearch.length > 2) {
               setBrandGridParameters((prev) => {
                  return {
                     ...prev,
                     searchText: textToSearch,
                     searchColumn: columnSelected,
                  }
               })
            }
         }
         if (textToSearch === "") {
            setBrandGridParameters((prev) => {
               return {
                  ...prev,
                  searchText: "",
                  searchColumn: columnSelected,
               }
            })
         }
      },
      [setBrandGridParameters, columnSelected],
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
         value={columnSelected}
         onChange={(event) => setColumnSelected(event.currentTarget.value)}
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

export default SearchBrandByColumnComponent
