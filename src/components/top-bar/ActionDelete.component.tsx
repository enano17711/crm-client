import React from "react"
import { ActionIcon, Tooltip } from "@mantine/core"
import { IconTrash } from "@tabler/icons-react"

interface ActionDeleteComponentProps {
   deleteFunction: (args: ((prev: boolean) => boolean) | boolean) => void
   disabled: boolean
}

const ActionDeleteComponent = ({
   deleteFunction,
   disabled,
}: ActionDeleteComponentProps) => {
   return (
      <Tooltip
         label="Borrar"
         color="red"
         position="bottom"
         withArrow
         arrowPosition="center"
      >
         <ActionIcon
            color="red"
            variant="light"
            size="lg"
            disabled={disabled}
            onClick={() => deleteFunction(true)}
         >
            <IconTrash />
         </ActionIcon>
      </Tooltip>
   )
}

export default ActionDeleteComponent
