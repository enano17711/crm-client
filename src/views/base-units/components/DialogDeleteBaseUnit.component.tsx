import React from "react"
import { Button, Modal, Stack, Text } from "@mantine/core"
import { useAppStore } from "../../../store"

const DialogDeleteBaseUnitComponent = () => {
   const { baseUnitsStore } = useAppStore()
   const { singleModel, openDeleteModal } = baseUnitsStore.getters
   const onModalClose = () => {
      baseUnitsStore.actions.disposeState()
   }
   const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
      baseUnitsStore.actions.deleteBaseUnit(singleModel.baseUnitId)
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
            <Text>
               Se eliminará la unidad base: NOMBRE - {singleModel?.name} -
               CODIGO - {singleModel?.code}
            </Text>

            <Button color="red" onClick={deleteHandler}>
               Eliminar
            </Button>
         </Stack>
      </Modal>
   )
}

export default DialogDeleteBaseUnitComponent
