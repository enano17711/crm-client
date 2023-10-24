import React from "react"
import { ActionIcon, Menu, Tooltip } from "@mantine/core"
import { IconTrash } from "@tabler/icons-react"

interface ActionDeleteMenuProps {
   children: React.ReactNode
   disabled: boolean
}
const ActionDeleteMenuComponent = ({
   children,
   disabled,
}: ActionDeleteMenuProps) => {
   return (
      <Menu shadow="md" disabled={disabled}>
         <Menu.Target>
            <Tooltip
               label="Borrar"
               color="red"
               position="bottom"
               withArrow
               arrowPosition="center"
               disabled={disabled}
            >
               <ActionIcon
                  color="red"
                  variant="light"
                  size="lg"
                  disabled={disabled}
               >
                  <IconTrash />
               </ActionIcon>
            </Tooltip>
         </Menu.Target>
         <Menu.Dropdown>
            <Menu.Label>Borrar</Menu.Label>
            {children}
         </Menu.Dropdown>
      </Menu>
   )
}

export default ActionDeleteMenuComponent
