import { Button, Group, Modal, Stack, TextInput } from "@mantine/core"
import { CreateBaseUnitDto, UpdateBaseUnitDto } from "../../../api-services"
import { useEffect } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useAppStore } from "../../../store"

interface IFormInputs {
   name: string
   code: string
   description: string
}

export const ModalCreateBaseUnitComponent = () => {
   const { baseUnitsStore } = useAppStore()
   const { modalType, openUpdateModal, singleModel } = baseUnitsStore.getters

   const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
   } = useForm<IFormInputs>({
      defaultValues: {
         name: "",
         code: "",
         description: "",
      },
   })
   const onModalClose = () => {
      baseUnitsStore.actions.disposeState()
      reset({
         name: "",
         code: "",
         description: "",
      })
   }
   const onSubmit: SubmitHandler<IFormInputs> = (data) => {
      if (modalType === "create") {
         baseUnitsStore.actions.addBaseUnit(data as CreateBaseUnitDto)
      } else {
         baseUnitsStore.actions.updateBaseUnit(
            singleModel.baseUnitId,
            data as UpdateBaseUnitDto,
         )
      }
      onModalClose()
   }

   useEffect(() => {
      if (singleModel?.name) {
         reset({
            name: singleModel?.name,
            code: singleModel?.code,
            description: singleModel?.description,
         })
      }
   }, [singleModel])

   return (
      <>
         <Modal
            opened={openUpdateModal}
            title={
               modalType === "create"
                  ? "Crear Unidad Base"
                  : "Editar Unidad Base"
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
                           placeholder="Milimetro"
                           withAsterisk
                           error={
                              errors.name?.type === "required" &&
                              "Este campo es requerido"
                           }
                        />
                     )}
                  />
                  <Controller
                     name="code"
                     control={control}
                     rules={{ required: true }}
                     render={({ field }) => (
                        <TextInput
                           {...field}
                           label="Codigo"
                           placeholder="Milimetro"
                           withAsterisk
                           error={
                              errors.code?.type === "required" &&
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
