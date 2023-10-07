import React from "react"
import { ActionIcon, Tooltip } from "@mantine/core"
import { IconCopy } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"

interface ActionCloneComponentProps {
   disabled: boolean
   cloneUrl: string
}

const ActionCloneComponent = ({
   disabled,
   cloneUrl,
}: ActionCloneComponentProps) => {
   const navigate = useNavigate()
   return (
      <Tooltip
         label="Clonar"
         color="indigo"
         position="bottom"
         withArrow
         arrowPosition="center"
      >
         <ActionIcon
            color="indigo"
            variant="light"
            size="lg"
            onClick={() => navigate(cloneUrl)}
            disabled={disabled}
         >
            <IconCopy />
         </ActionIcon>
      </Tooltip>
   )
}

export default ActionCloneComponent
