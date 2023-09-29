import React from "react"
import { NativeSelect, rem, TextInput } from "@mantine/core"

const data = [
   { value: "eur", label: "🇪🇺 EUR" },
   { value: "usd", label: "🇺🇸 USD" },
   { value: "cad", label: "🇨🇦 CAD" },
   { value: "gbp", label: "🇬🇧 GBP" },
   { value: "aud", label: "🇦🇺 AUD" },
]

const SearchByColumnComponent = () => {
   const select = (
      <NativeSelect
         data={data}
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
