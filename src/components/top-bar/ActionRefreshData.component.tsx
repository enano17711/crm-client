import React from "react"
import { ActionIcon, Tooltip } from "@mantine/core"
import { IconRefresh } from "@tabler/icons-react"
import { useQueryClient } from "@tanstack/react-query"

interface ActionRefreshDataComponentProps {
   queryKey: string[]
}

const ActionRefreshDataComponent = ({
   queryKey,
}: ActionRefreshDataComponentProps) => {
   const queryClient = useQueryClient()

   return (
      <Tooltip
         label="Refrescar"
         color="red"
         position="bottom"
         withArrow
         arrowPosition="center"
      >
         <ActionIcon
            color="red"
            variant="light"
            size="lg"
            onClick={() =>
               queryClient.invalidateQueries({
                  queryKey: queryKey,
               })
            }
         >
            <IconRefresh />
         </ActionIcon>
      </Tooltip>
   )
}

export default ActionRefreshDataComponent
