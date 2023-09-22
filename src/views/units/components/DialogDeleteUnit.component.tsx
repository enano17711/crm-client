import React from "react"
import { Button, Modal, Stack, Text } from "@mantine/core"
import { useAppStore } from "../../../store"

const DialogDeleteUnitComponent = () => {
   const { unitsStore } = useAppStore()
   const { singleModel, openDeleteModal } = unitsStore.getters
   const onModalClose = () => {
      unitsStore.actions.disposeState()
   }
   const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
      unitsStore.actions.deleteUnit(singleModel.unitId)
      onModalClose()
   }

   return (
      <Modal
         opened={openDeleteModal}
         title="Eliminar Unidad"
         centered
         onClose={onModalClose}
         closeOnClickOutside={false}
      >
         <Stack>
            <Text>
               Se eliminará la unidad: NOMBRE - {singleModel?.name} - CODIGO -{" "}
               {singleModel?.code}
            </Text>

            <Button color="red" onClick={deleteHandler}>
               Eliminar
            </Button>
         </Stack>
      </Modal>
   )
}

export default DialogDeleteUnitComponent
