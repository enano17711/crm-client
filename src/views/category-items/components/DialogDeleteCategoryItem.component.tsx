import { useAtom } from "jotai"
import {
   openCategoryItemDeleteModalAtom,
   selectedCategoryItemAtom,
} from "../../../store/categoryItem.atoms.ts"
import { useQueryClient } from "@tanstack/react-query"
import { useApiCategoryItemCategoryItemIdDeleteHook } from "../../../api-gen/hooks/categoryItemController"
import { successNotification } from "../../../utils"
import { Button, Group, Modal, Stack, Text } from "@mantine/core"
import { IconArrowLeft, IconTrash } from "@tabler/icons-react"
import React from "react"

const DialogDeleteCategoryItemComponent = () => {
   const [selectedCategoryItem, setSelectedCategoryItem] = useAtom(
      selectedCategoryItemAtom,
   )
   const [openDeleteModal, setOpenDeleteModal] = useAtom(
      openCategoryItemDeleteModalAtom,
   )
   const queryClient = useQueryClient()

   const { mutate: deleteCategoryItemMutate } =
      useApiCategoryItemCategoryItemIdDeleteHook(
         selectedCategoryItem?.categoryItemId,
         {
            mutation: {
               onSuccess: () => {
                  setSelectedCategoryItem({})
                  successNotification()
                  queryClient.invalidateQueries({
                     queryKey: ["/api/category-item/category-items"],
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
            <Text>Se eliminará la Categoria: {selectedCategoryItem?.name}</Text>

            <Group position="right">
               <Button
                  color="red"
                  onClick={() => deleteCategoryItemMutate()}
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

export default DialogDeleteCategoryItemComponent
