import React from "react"
import { ActionIcon, Menu, Tooltip } from "@mantine/core"
import { IconEdit } from "@tabler/icons-react"

interface ActionEditMenuProps {
   children: React.ReactNode
   disabled: boolean
}
const ActionEditMenuComponent = ({
   children,
   disabled,
}: ActionEditMenuProps) => {
   return (
      <Menu shadow="md" disabled={disabled}>
         <Menu.Target>
            <Tooltip
               label="Editar"
               color="grape"
               position="bottom"
               withArrow
               arrowPosition="center"
               disabled={disabled}
            >
               <ActionIcon
                  color="grape"
                  variant="light"
                  size="lg"
                  disabled={disabled}
               >
                  <IconEdit />
               </ActionIcon>
            </Tooltip>
         </Menu.Target>
         <Menu.Dropdown>
            <Menu.Label>Editar</Menu.Label>
            {children}
         </Menu.Dropdown>
      </Menu>
   )
}

export default ActionEditMenuComponent
