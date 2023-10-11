import React from "react"
import { Tabs } from "@mantine/core"
import TabUnitsFromBaseUnitComponent from "./TabUnitsFromBaseUnit.component.tsx"

const TabsBaseUnitComponent = () => {
   return (
      <Tabs keepMounted={false} defaultValue="first">
         <Tabs.List>
            <Tabs.Tab value="first">Unidades</Tabs.Tab>
            <Tabs.Tab value="second">Historial</Tabs.Tab>
         </Tabs.List>

         <TabUnitsFromBaseUnitComponent />
         <Tabs.Panel value="second">Second panel</Tabs.Panel>
      </Tabs>
   )
}

export default TabsBaseUnitComponent
