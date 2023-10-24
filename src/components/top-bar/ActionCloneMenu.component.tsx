import React from "react"
import { ActionIcon, Menu, Tooltip } from "@mantine/core"
import { IconCopy } from "@tabler/icons-react"

interface ActionCloneMenuProps {
   children: React.ReactNode
}
const ActionCloneMenuComponent = ({ children }: ActionCloneMenuProps) => {
   return (
      <Menu shadow="md">
         <Menu.Target>
            <Tooltip
               label="Clonar"
               color="indigo"
               position="bottom"
               withArrow
               arrowPosition="center"
            >
               <ActionIcon color="indigo" variant="light" size="lg">
                  <IconCopy />
               </ActionIcon>
            </Tooltip>
         </Menu.Target>
         <Menu.Dropdown>
            <Menu.Label>Clonar</Menu.Label>
            {children}
         </Menu.Dropdown>
      </Menu>
   )
}

export default ActionCloneMenuComponent
