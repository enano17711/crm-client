import React from "react"
import { ExpanderComponentProps } from "react-data-table-component"
import { ItemSimpleDto } from "../../../../api-gen"
import { Space, Tabs } from "@mantine/core"
import ItemBatchesTabComponent from "./ItemBatchesTab.component.tsx"

const DataGridItemExpandedComponent = ({
   data,
}: ExpanderComponentProps<ItemSimpleDto>) => {
   return (
      <Tabs keepMounted={false} defaultValue="first" pl="xl">
         <Space h="sm" />
         <Tabs.List>
            <Tabs.Tab value="first">Item Batches</Tabs.Tab>
            <Tabs.Tab value="second">Historial</Tabs.Tab>
         </Tabs.List>

         <ItemBatchesTabComponent data={data} />
         <Tabs.Panel value="second">Second panel</Tabs.Panel>
      </Tabs>
   )
}

export default DataGridItemExpandedComponent
