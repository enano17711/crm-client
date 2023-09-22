import { Button, Group, Modal, Stack, TextInput } from "@mantine/core"
import { CreateCustomerDto, UpdateCustomerDto } from "../../../api-services"
import { useEffect } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useAppStore } from "../../../store"

export const ModalCreateCustomerComponent = () => {
   const { customersStore } = useAppStore()
   const { modalType, openUpdateModal, singleModel } = customersStore.getters

   const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
   } = useForm<CreateCustomerDto>({
      defaultValues: {
         name: "",
         companyName: "",
         nit: "",
         ci: "",
         email: "",
         phone: "",
         address: "",
         city: "",
         state: "",
         country: "",
         description: "",
      },
   })
   const onModalClose = () => {
      customersStore.actions.disposeState()
      reset({
         name: "",
         companyName: "",
         nit: "",
         ci: "",
         email: "",
         phone: "",
         address: "",
         city: "",
         state: "",
         country: "",
         description: "",
      })
   }
   const onSubmit: SubmitHandler<CreateCustomerDto> = (data) => {
      if (modalType === "create") {
         customersStore.actions.addCustomer(data as CreateCustomerDto)
      } else {
         customersStore.actions.updateCustomer(
            singleModel.customerId,
            data as UpdateCustomerDto,
         )
      }
      onModalClose()
   }

   useEffect(() => {
      if (singleModel?.name) {
         reset({
            name: singleModel?.name,
            companyName: singleModel?.companyName,
            nit: singleModel?.nit,
            ci: singleModel?.ci,
            email: singleModel?.email,
            phone: singleModel?.phone,
            address: singleModel?.address,
            city: singleModel?.city,
            state: singleModel?.state,
            country: singleModel?.country,
            description: singleModel?.description,
         })
      }
   }, [singleModel])

   return (
      <>
         <Modal
            opened={openUpdateModal}
            title={modalType === "create" ? "Crear Cliente" : "Editar Cliente"}
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
                     name="companyName"
                     control={control}
                     render={({ field }) => (
                        <TextInput
                           {...field}
                           label="Nombre de la empresa"
                           placeholder="Coca-Cola"
                        />
                     )}
                  />
                  <Controller
                     name="nit"
                     control={control}
                     render={({ field }) => (
                        <TextInput
                           {...field}
                           label="Nit"
                           placeholder="Coca-Cola"
                        />
                     )}
                  />
                  <Controller
                     name="ci"
                     control={control}
                     render={({ field }) => (
                        <TextInput
                           {...field}
                           label="Ci"
                           placeholder="Coca-Cola"
                        />
                     )}
                  />
                  <Controller
                     name="email"
                     control={control}
                     render={({ field }) => (
                        <TextInput
                           {...field}
                           label="Email"
                           placeholder="Coca-Cola"
                        />
                     )}
                  />
                  <Controller
                     name="phone"
                     control={control}
                     render={({ field }) => (
                        <TextInput
                           {...field}
                           label="Telefono"
                           placeholder="Coca-Cola"
                        />
                     )}
                  />
                  <Controller
                     name="address"
                     control={control}
                     render={({ field }) => (
                        <TextInput
                           {...field}
                           label="Direccion"
                           placeholder="Coca-Cola"
                        />
                     )}
                  />
                  <Controller
                     name="city"
                     control={control}
                     render={({ field }) => (
                        <TextInput
                           {...field}
                           label="Ciudad"
                           placeholder="Coca-Cola"
                        />
                     )}
                  />
                  <Controller
                     name="state"
                     control={control}
                     render={({ field }) => (
                        <TextInput
                           {...field}
                           label="Estado"
                           placeholder="Coca-Cola"
                        />
                     )}
                  />
                  <Controller
                     name="country"
                     control={control}
                     render={({ field }) => (
                        <TextInput
                           {...field}
                           label="Pais"
                           placeholder="Coca-Cola"
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
