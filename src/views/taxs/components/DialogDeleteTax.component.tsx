import React from "react"
import { Button, Modal, Stack, Text } from "@mantine/core"
import { useAppStore } from "../../../store"

const DialogDeleteTaxComponent = () => {
   const { taxsStore } = useAppStore()
   const { singleModel, openDeleteModal } = taxsStore.getters
   const onModalClose = () => {
      taxsStore.actions.disposeState()
   }
   const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
      taxsStore.actions.deleteTax(singleModel.taxId)
      onModalClose()
   }

   return (
      <Modal
         opened={openDeleteModal}
         title="Eliminar Impuesto"
         centered
         onClose={onModalClose}
         closeOnClickOutside={false}
      >
         <Stack>
            <Text>
               Se eliminará el impuesto: NOMBRE - {singleModel?.name} - TASA -{" "}
               {singleModel?.rate}
            </Text>

            <Button color="red" onClick={deleteHandler}>
               Eliminar
            </Button>
         </Stack>
      </Modal>
   )
}

export default DialogDeleteTaxComponent
