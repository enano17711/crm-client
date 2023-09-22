import React from "react"
import { Button, Modal, Stack, Text } from "@mantine/core"
import { useAppStore } from "../../../store"

const DialogDeleteSupplierComponent = () => {
   const { suppliersStore } = useAppStore()
   const { singleModel, openDeleteModal } = suppliersStore.getters
   const onModalClose = () => {
      suppliersStore.actions.disposeState()
   }
   const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
      suppliersStore.actions.deleteSupplier(singleModel.supplierId)
      onModalClose()
   }

   return (
      <Modal
         opened={openDeleteModal}
         title="Eliminar Proveedor"
         centered
         onClose={onModalClose}
         closeOnClickOutside={false}
      >
         <Stack>
            <Text>
               Se eliminará el proveedor: NOMBRE - {singleModel?.name} - EMPRESA
               - {singleModel?.companyName} - CI - {singleModel?.ci} - NIT -{" "}
               {singleModel?.nit}
            </Text>

            <Button color="red" onClick={deleteHandler}>
               Eliminar
            </Button>
         </Stack>
      </Modal>
   )
}

export default DialogDeleteSupplierComponent
