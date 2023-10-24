import React from "react"
import { useAtom } from "jotai"
import { useQueryClient } from "@tanstack/react-query"
import {
   openItemBatchedDeleteModalAtom,
   selectedItemBatchedAtom,
} from "../../../store/itemBatch.atoms.ts"
import { useApiItemItemBatchIdDeleteHook } from "../../../api-gen/hooks/itemController"
import { successNotification } from "../../../utils"
import { Button, Group, Modal, Stack, Text } from "@mantine/core"
import { IconArrowLeft, IconTrash } from "@tabler/icons-react"

const DialogDeleteItemBatchComponent = () => {
   const [selectedItemBatch, setSelectedItemBatch] = useAtom(
      selectedItemBatchedAtom,
   )
   const [openDeleteModalBatch, setOpenDeleteModalBatch] = useAtom(
      openItemBatchedDeleteModalAtom,
   )

   const queryClient = useQueryClient()

   const { mutate: deleteItemMutate } = useApiItemItemBatchIdDeleteHook(
      selectedItemBatch?.itemBatchId,
      {
         mutation: {
            onSuccess: () => {
               successNotification()
               queryClient.invalidateQueries({
                  queryKey: ["/api/item/item-batches"],
               })
               setSelectedItemBatch({})
               setOpenDeleteModalBatch(false)
            },
         },
      },
   )

   return (
      <Modal
         opened={openDeleteModalBatch}
         title="Eliminar Item Batch"
         centered
         onClose={() => setOpenDeleteModalBatch(false)}
         closeOnClickOutside={false}
      >
         <Stack>
            <Text>
               Se eliminará el item batch: {selectedItemBatch?.batchNumber}
            </Text>

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
                  onClick={() => setOpenDeleteModalBatch(false)}
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

export default DialogDeleteItemBatchComponent
