import React from "react"
import { Button, Modal, Stack, Text } from "@mantine/core"
import { useAppStore } from "../../../store"

const DialogDeleteCategoryItemComponent = () => {
   const { categoryItemsStore } = useAppStore()
   const { singleModel, openDeleteModal } = categoryItemsStore.getters
   const onModalClose = () => {
      categoryItemsStore.actions.disposeState()
   }
   const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
      categoryItemsStore.actions.deleteCategoryItem(singleModel.categoryItemId)
      onModalClose()
   }

   return (
      <Modal
         opened={openDeleteModal}
         title="Eliminar Categoria de Items"
         centered
         onClose={onModalClose}
         closeOnClickOutside={false}
      >
         <Stack>
            <Text>
               Se eliminará la categoria de items: NOMBRE - {singleModel?.name}
            </Text>

            <Button color="red" onClick={deleteHandler}>
               Eliminar
            </Button>
         </Stack>
      </Modal>
   )
}

export default DialogDeleteCategoryItemComponent
