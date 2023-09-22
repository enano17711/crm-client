import React from "react"
import { useAppStore } from "../../../store"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import {
   CreateItemBatchDto,
   CreateTaxDto,
   UpdateTaxDto,
} from "../../../api-services"
import { Button, Group, Modal, Select, Stack, TextInput } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"

interface IFormInputs {
   batchNumber: string
   batchDate: Date
   quantity: number
   itemId: string
}

const ModalCreateItemBatchComponent = () => {
   const { itemsStore } = useAppStore()
   const { items, openCreateItemBatchModal } = itemsStore.getters

   const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
   } = useForm<IFormInputs>({
      defaultValues: {
         batchNumber: "",
         batchDate: new Date(),
         quantity: 0,
         itemId: "",
      },
   })

   const onModalClose = () => {
      itemsStore.actions.disposeState()
      reset({
         batchNumber: "",
         batchDate: new Date(),
         quantity: 0,
         itemId: "",
      })
   }

   const onSubmit: SubmitHandler<IFormInputs> = (data) => {
      const dataForCreate: CreateItemBatchDto = {
         batchNumber: data.batchNumber,
         batchDate: data.batchDate,
         quantity: data.quantity,
         itemId: Number(data.itemId),
      }
      itemsStore.actions.addItemBatch(dataForCreate)
      onModalClose()
   }

   return (
      <Modal
         opened={openCreateItemBatchModal}
         title="Create Item Batch"
         centered
         onClose={onModalClose}
         closeOnClickOutside={false}
      >
         <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="sm">
               <Controller
                  name="itemId"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <Select
                        {...field}
                        withAsterisk
                        label="Item"
                        searchable
                        maxDropdownHeight={150}
                        error={
                           errors.itemId?.type === "required" &&
                           "Este campo es requerido"
                        }
                        data={
                           items.length === 0
                              ? ["No items found"]
                              : items
                                   .filter((itemFilter) => itemFilter.isBatched)
                                   .map((item) => {
                                      return {
                                         label: `${item.name} - ${item.code}`,
                                         value: item.itemId.toString(),
                                      }
                                   })
                        }
                     />
                  )}
               />
               <Controller
                  name="batchNumber"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <TextInput
                        label="Batch Number"
                        {...field}
                        withAsterisk
                        error={
                           errors.batchNumber?.type === "required" &&
                           "Este campo es requerido"
                        }
                     />
                  )}
               />
               <Controller
                  name="batchDate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <DatePickerInput
                        {...field}
                        label="Batch Date"
                        withAsterisk
                        dropdownType="modal"
                        error={
                           errors.batchDate?.type === "required" &&
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
   )
}

export default ModalCreateItemBatchComponent
