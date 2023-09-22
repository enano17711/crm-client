import { Button, Group, Modal, Stack, TextInput } from "@mantine/core"
import { CreateBrandDto, UpdateBrandDto } from "../../../api-services"
import { useEffect } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useAppStore } from "../../../store"

interface IFormInputs {
   name: string
   description: string
}

export const ModalCreateBrandComponent = () => {
   const { brandsStore } = useAppStore()
   const { modalType, openUpdateModal, singleModel } = brandsStore.getters

   const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
   } = useForm<IFormInputs>({
      defaultValues: {
         name: "",
         description: "",
      },
   })
   const onModalClose = () => {
      brandsStore.actions.disposeState()
      reset({
         name: "",
         description: "",
      })
   }
   const onSubmit: SubmitHandler<IFormInputs> = (data) => {
      if (modalType === "create") {
         brandsStore.actions.addBrand(data as CreateBrandDto)
      } else {
         brandsStore.actions.updateBrand(
            singleModel.brandId,
            data as UpdateBrandDto,
         )
      }
      onModalClose()
   }

   useEffect(() => {
      if (singleModel?.name) {
         reset({
            name: singleModel?.name,
            description: singleModel?.description,
         })
      }
   }, [singleModel])

   return (
      <>
         <Modal
            opened={openUpdateModal}
            title={modalType === "create" ? "Crear Marca" : "Editar Marca"}
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
