import React from "react"
import { ActionIcon, Button, Group, Tooltip } from "@mantine/core"
import { Link } from "react-router-dom"
import {
   IconArrowLeft,
   IconBoxModel,
   IconRefresh,
   IconSquareRoundedPlus,
   IconSquareRoundedX,
} from "@tabler/icons-react"

interface BasicCreateTopBarComponentProps {
   backRoute: string
   reloadEnabled: boolean
   reloadFunction?: () => void
   setSaveType: React.Dispatch<
      React.SetStateAction<"create_new" | "create_clone" | "create_close">
   >
   children?: React.ReactNode
   refreshMethod?: () => void
   formKey: string
}

const CreateUpdateTopBarComponent = ({
   backRoute,
   reloadEnabled,
   setSaveType,
   children,
   refreshMethod,
   formKey,
}: BasicCreateTopBarComponentProps) => {
   return (
      <Group position="apart">
         <Group>
            <Link to={backRoute}>
               <Tooltip
                  label="Salir"
                  color="grape"
                  position="bottom"
                  withArrow
                  arrowPosition="center"
               >
                  <ActionIcon color="grape" variant="light" size="lg">
                     <IconArrowLeft />
                  </ActionIcon>
               </Tooltip>
            </Link>
            <Tooltip
               label="Recargar"
               color="red"
               position="bottom"
               withArrow
               arrowPosition="center"
            >
               <ActionIcon
                  color="red"
                  variant="light"
                  size="lg"
                  disabled={!reloadEnabled}
                  onClick={refreshMethod}
               >
                  <IconRefresh />
               </ActionIcon>
            </Tooltip>
            {children}
         </Group>
         <Group position="right">
            <Button
               variant="light"
               color="orange"
               leftIcon={<IconSquareRoundedPlus />}
               type="submit"
               form={formKey}
               onClick={() => setSaveType("create_new")}
            >
               Guardar y nuevo
            </Button>
            <Button
               variant="light"
               color="indigo"
               leftIcon={<IconBoxModel />}
               type="submit"
               form={formKey}
               onClick={() => setSaveType("create_clone")}
            >
               Guardar y clonar
            </Button>
            <Button
               variant="light"
               color="red"
               leftIcon={<IconSquareRoundedX />}
               type="submit"
               form={formKey}
               onClick={() => setSaveType("create_close")}
            >
               Guardar y cerrar
            </Button>
         </Group>
      </Group>
   )
}

export default CreateUpdateTopBarComponent
