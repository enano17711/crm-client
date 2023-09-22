import { Button, Group, Modal, Stack, TextInput } from "@mantine/core"
import {
   CreateCategoryItemDto,
   UpdateCategoryItemDto,
} from "../../../api-services"
import { useEffect } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useAppStore } from "../../../store"

interface IFormInputs {
   name: string
   description: string
}

export const ModalCreateCategoryItemComponent = () => {
   const { categoryItemsStore } = useAppStore()
   const { modalType, openUpdateModal, singleModel } =
      categoryItemsStore.getters

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
      categoryItemsStore.actions.disposeState()
      reset({
         name: "",
         description: "",
      })
   }
   const onSubmit: SubmitHandler<IFormInputs> = (data) => {
      if (modalType === "create") {
         categoryItemsStore.actions.addCategoryItem(
            data as CreateCategoryItemDto,
         )
      } else {
         categoryItemsStore.actions.updateCategoryItem(
            singleModel.categoryItemId,
            data as UpdateCategoryItemDto,
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
            title={
               modalType === "create"
                  ? "Crear Categoria de Items"
                  : "Editar Categoria de Items"
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
