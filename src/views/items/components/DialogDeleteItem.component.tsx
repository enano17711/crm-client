import React from "react"
import { Button, Modal, Stack, Text } from "@mantine/core"
import { useAppStore } from "../../../store"
import {
   BrandApi,
   BrandSimpleDto,
   ItemApi,
   ItemSimpleDto,
} from "../../../api-services"
import { DispatchFunc } from "ka-table/types"
import { getAPI } from "../../../axios-utils.ts"
import { loadData } from "ka-table/actionCreators"
import { notifications } from "@mantine/notifications"

interface DialogDeleteBrandComponentProps {
   openDeleteModal: any
   setOpenDeleteModal: any
   itemData: ItemSimpleDto
   dispatch: DispatchFunc
}

const DialogDeleteItemComponent = ({
   itemData,
   setOpenDeleteModal,
   openDeleteModal,
   dispatch,
}: DialogDeleteBrandComponentProps) => {
   const deleteHandler = () => {
      getAPI(ItemApi)
         .apiItemItemIdDelete(itemData?.itemId)
         .then((res) => {
            dispatch(loadData())
            notifications.show({
               title: "Operación Exitosa",
               message: "Marca eliminada con exito",
               color: "teal",
            })
         })
         .catch((err) => {
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         })
         .finally(() => {
            setOpenDeleteModal(false)
         })
   }

   return (
      <Modal
         opened={openDeleteModal}
         title="Eliminar Item"
         centered
         onClose={() => setOpenDeleteModal(false)}
         closeOnClickOutside={false}
      >
         <Stack>
            <Text>
               Se eliminará la item: NOMBRE - {itemData?.name} - CODIGO -{" "}
               {itemData?.code} y sus registros asociados de items con lote y
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
