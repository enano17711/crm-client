import React, { useCallback, useState } from "react"
import { useSetAtom } from "jotai"
import { itemGridParametersAtom } from "../../../store/item.atoms.ts"
import { NativeSelect, rem, TextInput } from "@mantine/core"

const columns = [
   {
      value: "Name",
      label: "Name",
   },
   {
      value: "Price",
      label: "Price",
   },
   {
      value: "Cost",
      label: "Cost",
   },
   {
      value: "Quantity",
      label: "Quantity",
   },
   {
      value: "Tax Cost Method",
      label: "Tax Cost Method",
   },
   {
      value: "Tax Price Method",
      label: "Tax Price Method",
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
const SearchItemByColumnComponent = () => {
   const [columnSelected, setColumnSelected] = useState("Name")
   const setItemGridParameters = useSetAtom(itemGridParametersAtom)

   const onTextSearchChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
         const textToSearch = event.currentTarget.value.trim()
         if (textToSearch !== null && textToSearch !== undefined) {
            if (textToSearch !== "" && textToSearch.length > 2) {
               setItemGridParameters((prev) => {
                  return {
                     ...prev,
                     searchText: textToSearch,
                     searchColumn: columnSelected,
                  }
               })
            }
         }
         if (textToSearch === "") {
            setItemGridParameters((prev) => {
               return {
                  ...prev,
                  searchText: "",
                  searchColumn: columnSelected,
               }
            })
         }
      },
      [setItemGridParameters, columnSelected],
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

export default SearchItemByColumnComponent
