import React, { useCallback, useState } from "react"
import { NativeSelect, rem, TextInput } from "@mantine/core"
import { useSetAtom } from "jotai"
import { unitGridParametersAtom } from "../../../store/unit.atoms.ts"

const columns = [
   {
      value: "Name",
      label: "Name",
   },
   {
      value: "Code",
      label: "Code",
   },
   {
      value: "Description",
      label: "Description",
   },
]
const SearchUnitByColumnComponent = () => {
   const [columnSelected, setColumnSelected] = useState("Name")
   const setUnitGridParameters = useSetAtom(unitGridParametersAtom)

   const onTextSearchChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
         const textToSearch = event.currentTarget.value.trim()
         if (textToSearch !== null && textToSearch !== undefined) {
            if (textToSearch !== "" && textToSearch.length > 2) {
               setUnitGridParameters((prev) => {
                  return {
                     ...prev,
                     searchText: textToSearch,
                     searchColumn: columnSelected,
                  }
               })
            }
         }
         if (textToSearch === "") {
            setUnitGridParameters((prev) => {
               return {
                  ...prev,
                  searchText: "",
                  searchColumn: columnSelected,
               }
            })
         }
      },
      [setUnitGridParameters, columnSelected],
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

export default SearchUnitByColumnComponent
