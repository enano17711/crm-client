import React, { useEffect } from "react"
import { useAppStore } from "../../../store"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import {
   Button,
   Group,
   Modal,
   NumberInput,
   Space,
   Stack,
   TextInput,
} from "@mantine/core"

interface IFormInputs {
   quantity: number
}

interface ModalEditeSaleItemQuantityComponentProps {
   refGrid: any
}

const ModalEditeSaleItemQuantityComponent = ({
   refGrid,
}: ModalEditeSaleItemQuantityComponentProps) => {
   const { salesStore } = useAppStore()
   const { openUpdateModal, singleModel } = salesStore.getters

   const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
   } = useForm<IFormInputs>({
      defaultValues: {
         quantity: 0,
      },
   })

   const onModalClose = () => {
      salesStore.actions.disposeState()
      reset({
         quantity: 0,
      })
   }

   const onSubmit: SubmitHandler<IFormInputs> = (data) => {
      salesStore.actions
         .updateItemSale(singleModel.itemSaleId, data.quantity)
         .finally(() => {
            refGrid?.current?.instance?.refresh()
            onModalClose()
         })
   }

   return (
      <>
         <Modal
            opened={openUpdateModal}
            title={`Add Quantity to ${singleModel?.item?.name}`}
            centered
            onClose={onModalClose}
            closeOnClickOutside={false}
         >
            <form onSubmit={handleSubmit(onSubmit)}>
               <TextInput
                  label="Cantidad Total"
                  value={singleModel?.quantity}
                  readOnly
               />
               <Space h="sm" />
               <TextInput
                  label="Cantidad Actual"
                  value={singleModel?.receivedQuantity}
                  readOnly
               />
               <Space h="sm" />
               <Stack spacing="sm">
                  <Controller
                     name="quantity"
                     control={control}
                     rules={{
                        required: true,
                        max:
                           singleModel?.quantity -
                           singleModel?.receivedQuantity,
                     }}
                     render={({ field }) => (
                        <NumberInput
                           {...field}
                           label="Cantidad a agregar"
                           precision={2}
                           min={0}
                           max={
                              singleModel?.quantity -
                              singleModel?.receivedQuantity
                           }
                           withAsterisk
                           parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                           formatter={(value) =>
                              !Number.isNaN(parseFloat(value))
                                 ? `${value}`.replace(
                                      /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                      ",",
                                   )
                                 : ""
                           }
                           error={
                              errors.quantity?.type === "required" &&
                              "Este campo es requerido"
                           }
                        />
                     )}
                  />
                  <Group position="right">
                     <Button color="red" onClick={onModalClose}>
                        Cancelar
                     </Button>
                     <Button type="submit">Aceptar</Button>
                  </Group>
               </Stack>
            </form>
         </Modal>
      </>
   )
}

export default ModalEditeSaleItemQuantityComponent
