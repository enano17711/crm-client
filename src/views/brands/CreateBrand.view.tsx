import React, { useEffect } from "react"
import { Space, Stack, Textarea, TextInput, Title } from "@mantine/core"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { CreateBrandDto } from "../../api-services"
import { useNavigate } from "react-router-dom"
import CreateUpdateTopBarComponent from "../../components/CreateUpdateTopBar.component.tsx"
import { useAtom } from "jotai"
import { selectedBrandAtom } from "../../store/brand.atoms.ts"
import { useApiBrandBrandPostHook } from "../../api-gen/hooks/brandController"

interface IFormInputs {
   name: string
   description: string
}

const CreateBrandView = () => {
   const [saveType, setSaveType] = React.useState<
      "create_new" | "create_close" | "create_clone"
   >("create_new")
   const [selectedBrand, setSelectedBrand] = useAtom(selectedBrandAtom)
   const navigate = useNavigate()

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

   const { mutate } = useApiBrandBrandPostHook({
      mutation: {
         onSuccess: (variables) => {
            setSelectedBrand({})
            if (saveType === "create_new") {
               reset({
                  name: "",
                  description: "",
               })
            } else if (saveType === "create_clone") {
               reset({
                  name: variables.name,
                  description: variables.description,
               })
            } else {
               reset({
                  name: "",
                  description: "",
               })
               navigate("/brands")
            }
         },
      },
   })

   const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
      mutate(data as CreateBrandDto)
   }

   useEffect(() => {
      if (
         selectedBrand?.name !== null &&
         selectedBrand?.name !== undefined &&
         selectedBrand?.description !== null &&
         selectedBrand?.description !== undefined
      ) {
         reset({
            name: selectedBrand?.name,
            description: selectedBrand?.description,
         })
      }
   }, [])

   return (
      <>
         <CreateUpdateTopBarComponent
            backRoute={"/brands"}
            reloadEnabled={false}
            setSaveType={setSaveType}
         >
            <Title order={3}>Crear Marca</Title>
         </CreateUpdateTopBarComponent>
         <Space h="sm" />
         <form id="create-brand-form" onSubmit={handleSubmit(onSubmit)}>
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
                     <Textarea
                        {...field}
                        label="Descripcion"
                        placeholder="Milimetro"
                        autosize
                        minRows={6}
                        maxRows={10}
                     />
                  )}
               />
            </Stack>
         </form>
      </>
   )
}

export default CreateBrandView
