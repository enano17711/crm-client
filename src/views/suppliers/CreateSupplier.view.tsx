import React, { useEffect } from "react"
import { useAtom } from "jotai"
import { selectedSupplierAtom } from "../../store/supplier.atoms.ts"
import { useNavigate } from "react-router-dom"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useApiSupplierSupplierPostHook } from "../../api-gen/hooks/supplierController"
import { CreateSupplierDto } from "../../api-gen"
import CreateUpdateTopBarComponent from "../../components/CreateUpdateTopBar.component.tsx"
import { Space, Stack, TextInput, Title } from "@mantine/core"

const CreateSupplierView = () => {
   const [saveType, setSaveType] = React.useState<
      "create_new" | "create_close" | "create_clone"
   >("create_new")
   const [selectedSupplier, setSelectedSupplier] = useAtom(selectedSupplierAtom)
   const navigate = useNavigate()

   const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
   } = useForm<CreateSupplierDto>({
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

   const { mutate } = useApiSupplierSupplierPostHook({
      mutation: {
         onSuccess: (_, variables) => {
            setSelectedSupplier({})
            if (saveType === "create_new") {
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
            } else if (saveType === "create_clone") {
               reset({
                  name: variables.name,
                  companyName: variables.companyName,
                  nit: variables.nit,
                  ci: variables.ci,
                  email: variables.email,
                  phone: variables.phone,
                  address: variables.address,
                  city: variables.city,
                  state: variables.state,
                  country: variables.country,
                  description: variables.description,
               })
            } else {
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
               navigate("/suppliers")
            }
         },
      },
   })

   const onSubmit: SubmitHandler<CreateSupplierDto> = async (data) => {
      mutate(data as CreateSupplierDto)
   }

   useEffect(() => {
      if (
         selectedSupplier?.name !== null &&
         selectedSupplier?.name !== undefined
      ) {
         reset({
            name: selectedSupplier?.name,
            companyName: selectedSupplier?.companyName,
            nit: selectedSupplier?.nit,
            ci: selectedSupplier?.ci,
            email: selectedSupplier?.email,
            phone: selectedSupplier?.phone,
            address: selectedSupplier?.address,
            city: selectedSupplier?.city,
            state: selectedSupplier?.state,
            country: selectedSupplier?.country,
            description: selectedSupplier?.description,
         })
      }
   }, [])

   return (
      <>
         <CreateUpdateTopBarComponent
            backRoute={"/suppliers"}
            reloadEnabled={false}
            formKey={"create-supplier-form"}
            setSaveType={setSaveType}
         >
            <Title order={3}>Crear Proveedor</Title>
         </CreateUpdateTopBarComponent>
         <Space h="sm" />
         <form id="create-supplier-form" onSubmit={handleSubmit(onSubmit)}>
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
                     <TextInput {...field} label="Ci" placeholder="Coca-Cola" />
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
            </Stack>
         </form>
      </>
   )
}

export default CreateSupplierView
