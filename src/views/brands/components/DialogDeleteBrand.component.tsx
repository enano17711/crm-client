import React from "react"
import { Button, Group, Modal, Stack, Text } from "@mantine/core"
import { BrandApi, BrandDto, BrandSimpleDto } from "../../../api-services"
import { getAPI } from "../../../axios-utils.ts"
import { notifications } from "@mantine/notifications"
import { DispatchFunc } from "ka-table/types"
import { loadData } from "ka-table/actionCreators"
import { errorNotification, successNotification } from "../../../utils"
import { IconArrowLeft, IconTrash } from "@tabler/icons-react"

interface DialogDeleteBrandComponentProps {
   openDeleteModal: any
   setOpenDeleteModal: any
   brandData: BrandSimpleDto
   setSelectedData: (
      value: ((prevState: BrandSimpleDto) => BrandSimpleDto) | BrandSimpleDto,
   ) => void
}

const DialogDeleteBrandComponent = ({
   openDeleteModal,
   setOpenDeleteModal,
   brandData,
   setSelectedData,
}: DialogDeleteBrandComponentProps) => {
   const deleteHandler = () => {
      getAPI(BrandApi)
         .apiBrandBrandIdDelete(brandData?.brandId)
         .then((res) => {
            setSelectedData(null)
            successNotification()
         })
         .catch((err) => {
            setSelectedData(null)
            setOpenDeleteModal(false)
            errorNotification(err.message)
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

            <Group position="right">
               <Button
                  color="red"
                  onClick={deleteHandler}
                  variant="light"
                  leftIcon={<IconTrash />}
               >
                  Eliminar
               </Button>
               <Button
                  color="grape"
                  onClick={() => setOpenDeleteModal(false)}
                  variant="light"
                  leftIcon={<IconArrowLeft />}
               >
                  Cancelar
               </Button>
            </Group>
         </Stack>
      </Modal>
   )
}

export default DialogDeleteBrandComponent
