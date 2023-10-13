import { useAtom } from "jotai"
import {
   openSupplierDeleteModalAtom,
   selectedSupplierAtom,
} from "../../../store/supplier.atoms.ts"
import { useQueryClient } from "@tanstack/react-query"
import { useApiSupplierSupplierIdDeleteHook } from "../../../api-gen/hooks/supplierController"
import { successNotification } from "../../../utils"
import { Button, Group, Modal, Stack, Text } from "@mantine/core"
import { IconArrowLeft, IconTrash } from "@tabler/icons-react"
import React from "react"

const DialogDeleteSupplierComponent = () => {
   const [selectedSupplier, setSelectedSupplier] = useAtom(selectedSupplierAtom)
   const [openDeleteModal, setOpenDeleteModal] = useAtom(
      openSupplierDeleteModalAtom,
   )
   const queryClient = useQueryClient()

   const { mutate: deleteSupplierMutate } = useApiSupplierSupplierIdDeleteHook(
      selectedSupplier?.supplierId,
      {
         mutation: {
            onSuccess: () => {
               setSelectedSupplier({})
               successNotification()
               queryClient.invalidateQueries({
                  queryKey: ["/api/supplier/suppliers"],
               })
               setOpenDeleteModal(false)
            },
         },
      },
   )

   return (
      <Modal
         opened={openDeleteModal}
         title="Eliminar Proveedor"
         centered
         onClose={() => setOpenDeleteModal(false)}
         closeOnClickOutside={false}
      >
         <Stack>
            <Text>Se eliminará la marca: {selectedSupplier?.name}</Text>

            <Group position="right">
               <Button
                  color="red"
                  onClick={() => deleteSupplierMutate()}
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

export default DialogDeleteSupplierComponent
