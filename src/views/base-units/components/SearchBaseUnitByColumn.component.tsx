import React, { useCallback, useState } from "react"
import { useSetAtom } from "jotai"
import { baseUnitGridParametersAtom } from "../../../store/baseUnit.atoms.ts"
import { NativeSelect, rem, TextInput } from "@mantine/core"

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
const SearchBaseUnitByColumnComponent = () => {
   const [columnSelected, setColumnSelected] = useState("Name")
   const setBaseUnitGridParameters = useSetAtom(baseUnitGridParametersAtom)

   const onTextSearchChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
         const textToSearch = event.currentTarget.value.trim()
         if (textToSearch !== null && textToSearch !== undefined) {
            if (textToSearch !== "" && textToSearch.length >= 2) {
               setBaseUnitGridParameters((prev) => {
                  return {
                     ...prev,
                     searchText: textToSearch,
                     searchColumn: columnSelected,
                  }
               })
            }
         }
         if (textToSearch === "") {
            setBaseUnitGridParameters((prev) => {
               return {
                  ...prev,
                  searchText: "",
                  searchColumn: columnSelected,
               }
            })
         }
      },
      [setBaseUnitGridParameters, columnSelected],
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

export default SearchBaseUnitByColumnComponent
