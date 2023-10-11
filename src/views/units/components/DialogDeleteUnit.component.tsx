import React from "react"
import { Button, Group, Modal, Stack, Text } from "@mantine/core"
import { successNotification } from "../../../utils"
import { IconArrowLeft, IconTrash } from "@tabler/icons-react"
import {
   openUnitDeleteModalAtom,
   selectedUnitAtom,
} from "../../../store/unit.atoms.ts"
import { useAtom } from "jotai"
import { useApiUnitUnitIdDeleteHook } from "../../../api-gen/hooks/unitController"
import { useQueryClient } from "@tanstack/react-query"

const DialogDeleteUnitComponent = () => {
   const [selectedUnit, setSelectedUnit] = useAtom(selectedUnitAtom)
   const [openDeleteModal, setOpenDeleteModal] = useAtom(
      openUnitDeleteModalAtom,
   )
   const queryClient = useQueryClient()

   const { mutate: deleteUnitMutate } = useApiUnitUnitIdDeleteHook(
      selectedUnit?.unitId,
      {
         mutation: {
            onSuccess: () => {
               setSelectedUnit({})
               successNotification()
               queryClient.invalidateQueries({
                  queryKey: ["/api/unit/units"],
               })
               setOpenDeleteModal(false)
            },
         },
      },
   )

   return (
      <Modal
         opened={openDeleteModal}
         title="Eliminar Unidad"
         centered
         onClose={() => setOpenDeleteModal(false)}
         closeOnClickOutside={false}
      >
         <Stack>
            <Text>Se eliminará la marca: {selectedUnit?.name}</Text>

            <Group position="right">
               <Button
                  color="red"
                  onClick={() => deleteUnitMutate()}
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

export default DialogDeleteUnitComponent
