import React from "react"
import { Button, Group, Modal, Stack, Text } from "@mantine/core"
import { successNotification } from "../../../utils"
import { IconArrowLeft, IconTrash } from "@tabler/icons-react"
import { selectedBrandAtom } from "../../../store/brand.atoms.ts"
import { useAtom } from "jotai"
import { useApiBrandBrandIdDeleteHook } from "../../../api-gen/hooks/brandController"

interface DialogDeleteBrandComponentProps {
   openDeleteModal: any
   setOpenDeleteModal: any
}

const DialogDeleteBrandComponent = ({
   openDeleteModal,
   setOpenDeleteModal,
}: DialogDeleteBrandComponentProps) => {
   const [selectedBrand, setSelectedBrand] = useAtom(selectedBrandAtom)

   const { mutate: deleteBrandMutate } = useApiBrandBrandIdDeleteHook(
      selectedBrand?.brandId,
   )

   const deleteHandler = () => {
      deleteBrandMutate()
      setOpenDeleteModal(false)
      successNotification()
   }

   return (
      <Modal
         opened={openDeleteModal}
         title="Eliminar Marca"
         centered
         onClose={() => setOpenDeleteModal(false)}
         closeOnClickOutside={false}
      >
         <Stack>
            <Text>Se eliminará la marca: NOMBRE - {selectedBrand?.name}</Text>

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
