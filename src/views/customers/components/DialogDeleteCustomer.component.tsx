import React from "react"
import { Button, Modal, Stack, Text } from "@mantine/core"
import { useAppStore } from "../../../store"

const DialogDeleteCustomerComponent = () => {
   const { customersStore } = useAppStore()
   const { singleModel, openDeleteModal } = customersStore.getters
   const onModalClose = () => {
      customersStore.actions.disposeState()
   }
   const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
      customersStore.actions.deleteCustomer(singleModel.customerId)
      onModalClose()
   }

   return (
      <Modal
         opened={openDeleteModal}
         title="Eliminar Cliente"
         centered
         onClose={onModalClose}
         closeOnClickOutside={false}
      >
         <Stack>
            <Text>
               Se eliminará el cliente: NOMBRE - {singleModel?.name} - EMPRESA -{" "}
               {singleModel?.companyName} - CI - {singleModel?.ci} - NIT -{" "}
               {singleModel?.nit}
            </Text>

            <Button color="red" onClick={deleteHandler}>
               Eliminar
            </Button>
         </Stack>
      </Modal>
   )
}

export default DialogDeleteCustomerComponent
