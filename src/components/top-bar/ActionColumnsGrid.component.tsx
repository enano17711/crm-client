import React from "react"
import { ActionIcon, Menu, Tooltip } from "@mantine/core"
import { IconColumns3 } from "@tabler/icons-react"

interface ActionColumnsGridProps {
   children: React.ReactNode
}

const ActionColumnsGridComponent = ({ children }: ActionColumnsGridProps) => {
   return (
      <Menu shadow="md">
         <Menu.Target>
            <Tooltip
               label="Columnas"
               color="red"
               position="bottom"
               withArrow
               arrowPosition="center"
            >
               <ActionIcon color="red" variant="light" size="lg">
                  <IconColumns3 />
               </ActionIcon>
            </Tooltip>
         </Menu.Target>
         <Menu.Dropdown>
            <Menu.Label>Columnas</Menu.Label>
            {children}
         </Menu.Dropdown>
      </Menu>
   )
}

export default ActionColumnsGridComponent
