import React from "react"
import { ActionIcon, Group, Tabs, Tooltip } from "@mantine/core"
import ActionRefreshDataComponent from "../../../components/top-bar/ActionRefreshData.component.tsx"
import { IconRefresh } from "@tabler/icons-react"

const TabUnitsFromBaseUnitComponent = () => {
   return (
      <Tabs.Panel value="first">
         <Group>
            <ActionRefreshDataComponent
               queryKey={["/api/base-unit/base-units"]}
            />
            <Tooltip
               label="Refrescar"
               color="red"
               position="bottom"
               withArrow
               arrowPosition="center"
            >
               <ActionIcon color="red" variant="light" size="lg">
                  <IconRefresh />
               </ActionIcon>
            </Tooltip>
         </Group>
      </Tabs.Panel>
   )
}

export default TabUnitsFromBaseUnitComponent
