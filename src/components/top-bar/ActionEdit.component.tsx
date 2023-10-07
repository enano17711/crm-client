import React from "react"
import { ActionIcon, Tooltip } from "@mantine/core"
import { IconEdit } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"

interface ActionEditComponentProps {
   editUrl: string
   disabled: boolean
}

const ActionEditComponent = ({
   editUrl,
   disabled,
}: ActionEditComponentProps) => {
   const navigate = useNavigate()
   return (
      <Tooltip
         label="Editar"
         color="grape"
         position="bottom"
         withArrow
         arrowPosition="center"
      >
         <ActionIcon
            color="grape"
            variant="light"
            size="lg"
            onClick={() => navigate(editUrl)}
            disabled={disabled}
         >
            <IconEdit />
         </ActionIcon>
      </Tooltip>
   )
}

export default ActionEditComponent
