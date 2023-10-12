import React, { useEffect } from "react"
import { useAtom } from "jotai"
import { selectedBaseUnitAtom } from "../../store/baseUnit.atoms.ts"
import { useNavigate } from "react-router-dom"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useApiBaseUnitBaseUnitPostHook } from "../../api-gen/hooks/baseUnitController"
import { CreateBaseUnitDto } from "../../api-gen"
import CreateUpdateTopBarComponent from "../../components/CreateUpdateTopBar.component.tsx"
import { Space, Stack, Textarea, TextInput, Title } from "@mantine/core"

interface IFormInputs {
   name: string
   code: string
   description: string
}
const CreateBaseUnitView = () => {
   const [saveType, setSaveType] = React.useState<
      "create_new" | "create_close" | "create_clone"
   >("create_new")
   const [selectedBaseUnit, setSelectedBaseUnit] = useAtom(selectedBaseUnitAtom)
   const navigate = useNavigate()

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

   const { mutate } = useApiBaseUnitBaseUnitPostHook({
      mutation: {
         onSuccess: (_, variables) => {
            setSelectedBaseUnit({})
            if (saveType === "create_new") {
               reset({
                  name: "",
                  code: "",
                  description: "",
               })
            } else if (saveType === "create_clone") {
               reset({
                  name: variables.name,
                  code: variables.code,
                  description: variables.description,
               })
            } else {
               reset({
                  name: "",
                  code: "",
                  description: "",
               })
               navigate("/base-units")
            }
         },
      },
   })

   const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
      mutate(data as CreateBaseUnitDto)
   }

   useEffect(() => {
      if (
         selectedBaseUnit?.name !== null &&
         selectedBaseUnit?.name !== undefined &&
         selectedBaseUnit?.code !== null &&
         selectedBaseUnit?.code !== undefined &&
         selectedBaseUnit?.description !== null &&
         selectedBaseUnit?.description !== undefined
      ) {
         reset({
            name: selectedBaseUnit?.name,
            code: selectedBaseUnit?.code,
            description: selectedBaseUnit?.description,
         })
      }
   }, [])

   return (
      <>
         <CreateUpdateTopBarComponent
            backRoute={"/base-units"}
            reloadEnabled={false}
            formKey={"create-baseUnit-form"}
            setSaveType={setSaveType}
         >
            <Title order={3}>Crear Unidad Base</Title>
         </CreateUpdateTopBarComponent>
         <Space h="sm" />
         <form id="create-baseUnit-form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="sm">
               <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <TextInput
                        {...field}
                        label="Nombre"
                        placeholder="Kilometro"
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
                        label="Código"
                        placeholder="km"
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
                        placeholder="medida basica para kilometro"
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

export default CreateBaseUnitView
