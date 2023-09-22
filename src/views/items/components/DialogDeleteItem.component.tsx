import React from "react"
import { Button, Modal, Stack, Text } from "@mantine/core"
import { useAppStore } from "../../../store"

const DialogDeleteItemComponent = () => {
   const { itemsStore } = useAppStore()
   const { singleModel, openDeleteModal } = itemsStore.getters
   const onModalClose = () => {
      itemsStore.actions.disposeState()
   }
   const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
      itemsStore.actions.deleteItem(singleModel.itemId)
      onModalClose()
   }

   return (
      <Modal
         opened={openDeleteModal}
         title="Eliminar Item"
         centered
         onClose={onModalClose}
         closeOnClickOutside={false}
      >
         <Stack>
            <Text>
               Se eliminará la item: NOMBRE - {singleModel?.name} - CODIGO -{" "}
               {singleModel?.code} y sus registros asociados de items con lote y
               fecha de vencimiento
            </Text>

            <Button color="red" onClick={deleteHandler}>
               Eliminar
            </Button>
         </Stack>
      </Modal>
   )
}

export default DialogDeleteItemComponent
