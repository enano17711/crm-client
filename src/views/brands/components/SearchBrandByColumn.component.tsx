import React, { useCallback } from "react"
import { NativeSelect, rem, TextInput } from "@mantine/core"
import { useAtom } from "jotai/index"
import { brandGridParametersAtom } from "../../../store/brand.atoms.ts"
import { useApiBrandBrandsGetHook } from "../../../api-gen/hooks/brandController"

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
   const [brandGridParameters, setBrandGridParameters] = useAtom(
      brandGridParametersAtom,
   )

   const {
      data: brandQueryData,
      error: brandQueryError,
      status: brandQueryStatus,
   } = useApiBrandBrandsGetHook({
      ColumnName: brandGridParameters.searchColumn,
      ColumnValue: brandGridParameters.searchText,
      PageNumber: brandGridParameters.pageIndex,
      PageSize: brandGridParameters.pageSize,
   })

   const onTextSearchChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
         const textToSearch = event.currentTarget.value.trim()
         if (textToSearch !== null && textToSearch !== undefined) {
            if (textToSearch !== "" && textToSearch.length > 2) {
               setBrandGridParameters((prev) => {
                  return {
                     ...prev,
                     searchText: textToSearch,
                  }
               })
            }
         }
         if (textToSearch === "") {
            setBrandGridParameters((prev) => {
               return {
                  ...prev,
                  searchText: "",
               }
            })
         }
      },
      [setBrandGridParameters],
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
         value={brandGridParameters.searchColumn}
         onChange={(event) =>
            setBrandGridParameters((prev) => {
               return {
                  ...prev,
                  searchColumn: event.currentTarget.value,
               }
            })
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

export default SearchBrandByColumnComponent
