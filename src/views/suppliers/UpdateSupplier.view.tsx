import React, { useEffect, useState } from "react"
import { useSetAtom } from "jotai"
import { selectedSupplierAtom } from "../../store/supplier.atoms.ts"
import { useNavigate, useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import {
   useApiSupplierSupplierIdGetHook,
   useApiSupplierSupplierIdPutHook,
} from "../../api-gen/hooks/supplierController"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { UpdateSupplierDto } from "../../api-gen"
import {
   Box,
   LoadingOverlay,
   Space,
   Stack,
   TextInput,
   Title,
} from "@mantine/core"
import CreateUpdateTopBarComponent from "../../components/CreateUpdateTopBar.component.tsx"

const UpdateSupplierView = () => {
   const setSelectedSupplier = useSetAtom(selectedSupplierAtom)
   const [saveType, setSaveType] = useState<
      "create_new" | "create_close" | "create_clone"
   >("create_new")
   const navigate = useNavigate()
   const params = useParams()

   const queryClient = useQueryClient()

   const refreshData = () => {
      queryClient.invalidateQueries([
         `/api/supplier/supplier/${params.supplierId}`,
      ])
      reset({
         name: supplierData.data.name,
         companyName: supplierData.data.companyName,
         nit: supplierData.data.nit,
         ci: supplierData.data.ci,
         email: supplierData.data.email,
         phone: supplierData.data.phone,
         address: supplierData.data.address,
         city: supplierData.data.city,
         state: supplierData.data.state,
         country: supplierData.data.country,
         description: supplierData.data.description,
      })
   }

   const {
      data: supplierData,
      status: supplierStatus,
      isFetching,
   } = useApiSupplierSupplierIdGetHook(Number(params.supplierId))

   const { mutate: supplierMutate } = useApiSupplierSupplierIdPutHook(
      Number(params.supplierId),
      {
         mutation: {
            onSuccess: async (_, variables) => {
               if (saveType === "create_new") {
                  setSelectedSupplier({})
                  navigate("/suppliers/create")
               } else if (saveType === "create_clone") {
                  setSelectedSupplier({
                     supplierId: Number(params.supplierId),
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
                  navigate(`/suppliers/create`)
               } else {
                  setSelectedSupplier({})
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
      },
   )

   const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
   } = useForm<UpdateSupplierDto>({
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

   const onSubmit: SubmitHandler<UpdateSupplierDto> = async (data) => {
      supplierMutate(data as UpdateSupplierDto)
   }

   useEffect(() => {
      if (!isFetching) {
         reset({
            name: supplierData.data.name,
            companyName: supplierData.data.companyName,
            nit: supplierData.data.nit,
            ci: supplierData.data.ci,
            email: supplierData.data.email,
            phone: supplierData.data.phone,
            address: supplierData.data.address,
            city: supplierData.data.city,
            state: supplierData.data.state,
            country: supplierData.data.country,
            description: supplierData.data.description,
         })
      }
   }, [supplierStatus])

   return (
      <Box pos="relative">
         {supplierStatus === "loading" && (
            <LoadingOverlay visible={true} overlayBlur={2} />
         )}
         <CreateUpdateTopBarComponent
            backRoute={"/suppliers"}
            reloadEnabled={true}
            formKey={"update-supplier-form"}
            setSaveType={setSaveType}
            refreshMethod={refreshData}
         >
            <Title order={4}>Editar: {supplierData?.data?.name}</Title>
         </CreateUpdateTopBarComponent>
         <Space h="sm" />
         <form id="update-supplier-form" onSubmit={handleSubmit(onSubmit)}>
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
      </Box>
   )
}

export default UpdateSupplierView
