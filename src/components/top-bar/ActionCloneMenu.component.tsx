import React from "react"
import { ActionIcon, Menu, Tooltip } from "@mantine/core"
import { IconCopy } from "@tabler/icons-react"

interface ActionCloneMenuProps {
   children: React.ReactNode
   disabled: boolean
}
const ActionCloneMenuComponent = ({
   children,
   disabled,
}: ActionCloneMenuProps) => {
   return (
      <Menu shadow="md" disabled={disabled}>
         <Menu.Target>
            <Tooltip
               label="Clonar"
               color="indigo"
               position="bottom"
               withArrow
               arrowPosition="center"
               disabled={disabled}
            >
               <ActionIcon
                  color="indigo"
                  variant="light"
                  size="lg"
                  disabled={disabled}
               >
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
