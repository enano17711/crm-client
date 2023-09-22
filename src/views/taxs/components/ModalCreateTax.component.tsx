import {
   Button,
   Group,
   Modal,
   NumberInput,
   Stack,
   TextInput,
} from "@mantine/core"
import { CreateTaxDto, UpdateTaxDto } from "../../../api-services"
import { useEffect } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useAppStore } from "../../../store"

interface IFormInputs {
   name: string
   rate: number
   description: string
}

export const ModalCreateTaxComponent = () => {
   const { taxsStore } = useAppStore()
   const { modalType, openUpdateModal, singleModel } = taxsStore.getters

   const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
   } = useForm<IFormInputs>({
      defaultValues: {
         name: "",
         rate: 0,
         description: "",
      },
   })
   const onModalClose = () => {
      taxsStore.actions.disposeState()
      reset({
         name: "",
         rate: 0,
         description: "",
      })
   }
   const onSubmit: SubmitHandler<IFormInputs> = (data) => {
      if (modalType === "create") {
         taxsStore.actions.addTax(data as CreateTaxDto)
      } else {
         taxsStore.actions.updateTax(singleModel.taxId, data as UpdateTaxDto)
      }
      onModalClose()
   }

   useEffect(() => {
      if (singleModel?.name) {
         reset({
            name: singleModel?.name,
            rate: singleModel?.rate,
            description: singleModel?.description,
         })
      }
   }, [singleModel])

   return (
      <>
         <Modal
            opened={openUpdateModal}
            title={
               modalType === "create" ? "Crear Impuesto" : "Editar Impuesto"
            }
            centered
            onClose={onModalClose}
            closeOnClickOutside={false}
         >
            <form onSubmit={handleSubmit(onSubmit)}>
               <Stack spacing="sm">
                  <Controller
                     name="name"
                     control={control}
                     rules={{ required: true }}
                     render={({ field }) => (
                        <TextInput
                           {...field}
                           label="Nombre"
                           placeholder="Coca-Cola"
                           withAsterisk
                           error={
                              errors.name?.type === "required" &&
                              "Este campo es requerido"
                           }
                        />
                     )}
                  />
                  <Controller
                     name="rate"
                     control={control}
                     rules={{ required: true }}
                     render={({ field }) => (
                        <NumberInput
                           {...field}
                           label="Valor"
                           precision={2}
                           min={0}
                           max={4294967295}
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
                              errors.rate?.type === "required" &&
                              "Este campo es requerido"
                           }
                        />
                     )}
                  />
                  <Controller
                     name="description"
                     control={control}
                     render={({ field }) => (
                        <TextInput
                           {...field}
                           label="Descripcion"
                           placeholder="Milimetro"
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
