import React from "react"
import { Button, Modal, Stack, Text } from "@mantine/core"
import { BrandApi, BrandDto, BrandSimpleDto } from "../../../api-services"
import { getAPI } from "../../../axios-utils.ts"
import { notifications } from "@mantine/notifications"
import { DispatchFunc } from "ka-table/types"
import { loadData } from "ka-table/actionCreators"

interface DialogDeleteBrandComponentProps {
   openDeleteModal: any
   setOpenDeleteModal: any
   brandData: BrandSimpleDto
   dispatch: DispatchFunc
}

const DialogDeleteBrandComponent = ({
   openDeleteModal,
   setOpenDeleteModal,
   brandData,
   dispatch,
}: DialogDeleteBrandComponentProps) => {
   const deleteHandler = () => {
      getAPI(BrandApi)
         .apiBrandBrandIdDelete(brandData?.brandId)
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
         title="Eliminar Base Unit"
         centered
         onClose={() => setOpenDeleteModal(false)}
         closeOnClickOutside={false}
      >
         <Stack>
            <Text>Se eliminará la marca: NOMBRE - {brandData?.name}</Text>

            <Button color="red" onClick={deleteHandler}>
               Eliminar
            </Button>
         </Stack>
      </Modal>
   )
}

export default DialogDeleteBrandComponent
