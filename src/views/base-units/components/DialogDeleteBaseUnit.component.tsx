import React from "react"
import { useAtom } from "jotai"
import {
   openBaseUnitDeleteModalAtom,
   selectedBaseUnitAtom,
} from "../../../store/baseUnit.atoms.ts"
import { useQueryClient } from "@tanstack/react-query"
import { useApiBaseUnitBaseUnitIdDeleteHook } from "../../../api-gen/hooks/baseUnitController"
import { successNotification } from "../../../utils"
import { Button, Group, Modal, Stack, Text } from "@mantine/core"
import { IconArrowLeft, IconTrash } from "@tabler/icons-react"

const DialogDeleteBaseUnitComponent = () => {
   const [selectedBaseUnit, setSelectedBaseUnit] = useAtom(selectedBaseUnitAtom)
   const [openDeleteModal, setOpenDeleteModal] = useAtom(
      openBaseUnitDeleteModalAtom,
   )
   const queryClient = useQueryClient()

   const { mutate: deleteBaseUnitMutate } = useApiBaseUnitBaseUnitIdDeleteHook(
      selectedBaseUnit?.baseUnitId,
      {
         mutation: {
            onSuccess: () => {
               setSelectedBaseUnit({})
               successNotification()
               queryClient.invalidateQueries({
                  queryKey: ["/api/base-unit/base-units"],
               })
               setOpenDeleteModal(false)
            },
         },
      },
   )

   return (
      <Modal
         opened={openDeleteModal}
         title="Eliminar Unidad Base"
         centered
         onClose={() => setOpenDeleteModal(false)}
         closeOnClickOutside={false}
      >
         <Stack>
            <Text>
               Se eliminará la Unidad Base: {selectedBaseUnit?.name} -{" "}
               {selectedBaseUnit?.code}
            </Text>

            <Group position="right">
               <Button
                  color="red"
                  onClick={() => deleteBaseUnitMutate()}
                  variant="light"
                  leftIcon={<IconTrash />}
               >
                  Eliminar
               </Button>
               <Button
                  color="grape"
                  onClick={() => setOpenDeleteModal(false)}
                  variant="light"
                  leftIcon={<IconArrowLeft />}
               >
                  Cancelar
               </Button>
            </Group>
         </Stack>
      </Modal>
   )
}

export default DialogDeleteBaseUnitComponent
