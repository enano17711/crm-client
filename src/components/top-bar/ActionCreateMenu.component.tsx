import React from "react"
import { ActionIcon, Menu, Tooltip } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"

interface ActionCreateMenuProps {
   children: React.ReactNode
}

const ActionCreateMenuComponent = ({ children }: ActionCreateMenuProps) => {
   return (
      <Menu shadow="md">
         <Menu.Target>
            <Tooltip
               label="Nuevo"
               color="orange"
               position="bottom"
               withArrow
               arrowPosition="center"
            >
               <ActionIcon color="orange" variant="light" size="lg">
                  <IconPlus />
               </ActionIcon>
            </Tooltip>
         </Menu.Target>
         <Menu.Dropdown>
            <Menu.Label>Crear</Menu.Label>
            {children}
         </Menu.Dropdown>
      </Menu>
   )
}

export default ActionCreateMenuComponent
