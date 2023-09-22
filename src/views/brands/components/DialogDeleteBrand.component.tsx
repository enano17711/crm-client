import React from "react"
import { Button, Modal, Stack, Text } from "@mantine/core"
import { useAppStore } from "../../../store"

const DialogDeleteBrandComponent = () => {
   const { brandsStore } = useAppStore()
   const { singleModel, openDeleteModal } = brandsStore.getters
   const onModalClose = () => {
      brandsStore.actions.disposeState()
   }
   const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
      brandsStore.actions.deleteBrand(singleModel.brandId)
      onModalClose()
   }

   return (
      <Modal
         opened={openDeleteModal}
         title="Eliminar Base Unit"
         centered
         onClose={onModalClose}
         closeOnClickOutside={false}
      >
         <Stack>
            <Text>Se eliminará la marca: NOMBRE - {singleModel?.name}</Text>

            <Button color="red" onClick={deleteHandler}>
               Eliminar
            </Button>
         </Stack>
      </Modal>
   )
}

export default DialogDeleteBrandComponent
