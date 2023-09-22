import React, { useEffect } from "react"
import { useAppStore } from "../../../store"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import {
   CreateOrderReturnDto,
   CreateUnitDto,
   UpdateUnitDto,
} from "../../../api-services"
import {
   Button,
   Group,
   Modal,
   NumberInput,
   Select,
   Stack,
   TextInput,
} from "@mantine/core"

interface IFormInputs {
   staffNote: string
   orderId: string
}

const ModalCreateOrderReturnComponent = () => {
   const { ordersStore, orderReturnsStore } = useAppStore()
   const { orders } = ordersStore.getters
   const { openUpdateModal } = orderReturnsStore.getters

   const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
   } = useForm<IFormInputs>({
      defaultValues: {
         orderId: "",
         staffNote: "",
      },
   })

   const onModalClose = () => {
      orderReturnsStore.actions.disposeState()
      reset({
         orderId: "",
         staffNote: "",
      })
   }

   const onSubmit: SubmitHandler<IFormInputs> = (data) => {
      orderReturnsStore.actions.addOrderReturn(
         Number(data.orderId),
         data.staffNote,
      )
      onModalClose()
   }

   useEffect(() => {
      if (orders.length <= 0) {
         ordersStore.actions.loadOrders()
      }
   }, [])

   return (
      <>
         <Modal
            opened={openUpdateModal}
            title="Crear Retorno de Compra"
            centered
            onClose={onModalClose}
            closeOnClickOutside={false}
         >
            <form onSubmit={handleSubmit(onSubmit)}>
               <Stack spacing="sm">
                  <Controller
                     name="orderId"
                     control={control}
                     rules={{ required: true }}
                     render={({ field }) => (
                        <Select
                           {...field}
                           withAsterisk
                           label="Orden de Compra"
                           searchable
                           error={
                              errors.orderId?.type === "required" &&
                              "Este campo es requerido"
                           }
                           data={
                              orders.length === 0
                                 ? ["No data"]
                                 : orders.map((order) => {
                                      return {
                                         label: `${order.referenceNumber}`,
                                         value: order.orderId.toString(),
                                      }
                                   })
                           }
                        />
                     )}
                  />
                  <Controller
                     name="staffNote"
                     control={control}
                     render={({ field }) => (
                        <TextInput {...field} label="Nota" withAsterisk />
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

export default ModalCreateOrderReturnComponent
