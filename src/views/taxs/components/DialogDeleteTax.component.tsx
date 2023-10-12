import { useAtom } from "jotai"
import {
   openTaxDeleteModalAtom,
   selectedTaxAtom,
} from "../../../store/tax.atoms.ts"
import { useQueryClient } from "@tanstack/react-query"
import { useApiTaxTaxIdDeleteHook } from "../../../api-gen/hooks/taxController"
import { successNotification } from "../../../utils"
import { Button, Group, Modal, Stack, Text } from "@mantine/core"
import { IconArrowLeft, IconTrash } from "@tabler/icons-react"
import React from "react"

const DialogDeleteTaxComponent = () => {
   const [selectedTax, setSelectedTax] = useAtom(selectedTaxAtom)
   const [openDeleteModal, setOpenDeleteModal] = useAtom(openTaxDeleteModalAtom)
   const queryClient = useQueryClient()

   const { mutate: deleteTaxMutate } = useApiTaxTaxIdDeleteHook(
      selectedTax?.taxId,
      {
         mutation: {
            onSuccess: () => {
               setSelectedTax({})
               successNotification()
               queryClient.invalidateQueries({
                  queryKey: ["/api/tax/brands"],
               })
               setOpenDeleteModal(false)
            },
         },
      },
   )

   return (
      <Modal
         opened={openDeleteModal}
         title="Eliminar Marca"
         centered
         onClose={() => setOpenDeleteModal(false)}
         closeOnClickOutside={false}
      >
         <Stack>
            <Text>Se eliminará el Impuesto: {selectedTax?.name}</Text>

            <Group position="right">
               <Button
                  color="red"
                  onClick={() => deleteTaxMutate()}
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

export default DialogDeleteTaxComponent
