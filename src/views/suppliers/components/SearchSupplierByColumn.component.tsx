import React, { useCallback, useState } from "react"
import { NativeSelect, rem, TextInput } from "@mantine/core"
import { supplierGridParametersAtom } from "../../../store/supplier.atoms.ts"
import { useSetAtom } from "jotai"

const columns = [
   {
      value: "Name",
      label: "Name",
   },
   {
      value: "CompanyName",
      label: "CompanyName",
   },
   {
      value: "Nit",
      label: "Nit",
   },
   {
      value: "Ci",
      label: "Ci",
   },
   {
      value: "Email",
      label: "Email",
   },
   {
      value: "Phone",
      label: "Phone",
   },
   {
      value: "Address",
      label: "Address",
   },
   {
      value: "City",
      label: "City",
   },
   {
      value: "State",
      label: "State",
   },
   {
      value: "Country",
      label: "Country",
   },
   {
      value: "Description",
      label: "Description",
   },
]
const SearchSupplierByColumnComponent = () => {
   const [columnSelected, setColumnSelected] = useState("Name")
   const setSupplierGridParameters = useSetAtom(supplierGridParametersAtom)

   const onTextSearchChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
         const textToSearch = event.currentTarget.value.trim()
         if (textToSearch !== null && textToSearch !== undefined) {
            if (textToSearch !== "" && textToSearch.length > 2) {
               setSupplierGridParameters((prev) => {
                  return {
                     ...prev,
                     searchText: textToSearch,
                     searchColumn: columnSelected,
                  }
               })
            }
         }
         if (textToSearch === "") {
            setSupplierGridParameters((prev) => {
               return {
                  ...prev,
                  searchText: "",
                  searchColumn: columnSelected,
               }
            })
         }
      },
      [setSupplierGridParameters, columnSelected],
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

export default SearchSupplierByColumnComponent
