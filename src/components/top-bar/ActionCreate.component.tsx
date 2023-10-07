import React from "react"
import { ActionIcon, Tooltip } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"

interface ActionCreateComponentProps {
   createFunction: () => void
}

const ActionCreateComponent = ({
   createFunction,
}: ActionCreateComponentProps) => {
   return (
      <Tooltip
         label="Nuevo"
         color="orange"
         position="bottom"
         withArrow
         arrowPosition="center"
      >
         <ActionIcon
            color="orange"
            variant="light"
            size="lg"
            onClick={createFunction}
         >
            <IconPlus />
         </ActionIcon>
      </Tooltip>
   )
}

export default ActionCreateComponent
