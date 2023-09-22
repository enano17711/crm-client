import React, { useEffect, useState } from "react"
import { Button, Modal, Stack, Text } from "@mantine/core"
import { useAppStore } from "../../../store"
import { ItemBatchDto } from "../../../api-services"

const DialogDeleteItemBatchComponent = () => {
   const [localSingleBatchModel, setLocalSingleBatchModel] =
      useState<ItemBatchDto | null>(null)

   const { itemsStore } = useAppStore()
   const { singleModelBatch, openDeleteItemBatchModal } = itemsStore.getters
   const onModalClose = () => {
      itemsStore.actions.disposeState()
   }
   const deleteHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
      itemsStore.actions.deleteItemBatch(singleModelBatch.itemBatchId)
      onModalClose()
   }

   useEffect(() => {
      if (singleModelBatch) {
         const newDate = new Date(singleModelBatch.batchDate)
         setLocalSingleBatchModel({ ...singleModelBatch, batchDate: newDate })
      }
   }, [singleModelBatch])

   return (
      <Modal
         opened={openDeleteItemBatchModal}
         title="Eliminar Item"
         centered
         onClose={onModalClose}
         closeOnClickOutside={false}
      >
         <Stack>
            <Text>
               Se eliminará la item de lote: LOTE -{" "}
               {singleModelBatch?.batchNumber} - EXPIRATION DATE -{" "}
               {localSingleBatchModel?.batchDate.toLocaleDateString()}
            </Text>

            <Button color="red" onClick={deleteHandler}>
               Eliminar
            </Button>
         </Stack>
      </Modal>
   )
}

export default DialogDeleteItemBatchComponent
