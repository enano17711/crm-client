import { useAtom } from "jotai"
import {
   openItemDeleteModalAtom,
   selectedItemAtom,
} from "../../../store/item.atoms.ts"
import { useQueryClient } from "@tanstack/react-query"
import { useApiItemItemIdDeleteHook } from "../../../api-gen/hooks/itemController"
import { successNotification } from "../../../utils"
import { Button, Group, Modal, Stack, Text } from "@mantine/core"
import { IconArrowLeft, IconTrash } from "@tabler/icons-react"
import React from "react"

const DialogDeleteItemComponent = () => {
   const [selectedItem, setSelectedItem] = useAtom(selectedItemAtom)
   const [openDeleteModal, setOpenDeleteModal] = useAtom(
      openItemDeleteModalAtom,
   )
   const queryClient = useQueryClient()

   const { mutate: deleteItemMutate } = useApiItemItemIdDeleteHook(
      selectedItem?.itemId,
      {
         mutation: {
            onSuccess: () => {
               setSelectedItem({})
               successNotification()
               queryClient.invalidateQueries({
                  queryKey: ["/api/item/items"],
               })
               setOpenDeleteModal(false)
            },
         },
      },
   )

   return (
      <Modal
         opened={openDeleteModal}
         title="Eliminar Item"
         centered
         onClose={() => setOpenDeleteModal(false)}
         closeOnClickOutside={false}
      >
         <Stack>
            <Text>Se eliminará el item: {selectedItem?.name}</Text>

            <Group position="right">
               <Button
                  color="red"
                  onClick={() => deleteItemMutate()}
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

export default DialogDeleteItemComponent
