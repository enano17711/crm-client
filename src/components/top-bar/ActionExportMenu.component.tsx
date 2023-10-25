import React from "react"
import { ActionIcon, Menu, Tooltip } from "@mantine/core"
import { IconFileExport } from "@tabler/icons-react"

interface ActionExportMenuProps {
   children: React.ReactNode
}

const ActionExportMenuComponent = ({ children }: ActionExportMenuProps) => {
   return (
      <Menu shadow="md">
         <Menu.Target>
            <Tooltip
               label="Exportar"
               color="lime"
               position="bottom"
               withArrow
               arrowPosition="center"
            >
               <ActionIcon color="lime" variant="light" size="lg">
                  <IconFileExport />
               </ActionIcon>
            </Tooltip>
         </Menu.Target>
         <Menu.Dropdown>
            <Menu.Label>Exportar</Menu.Label>
            {children}
         </Menu.Dropdown>
      </Menu>
   )
}

export default ActionExportMenuComponent
