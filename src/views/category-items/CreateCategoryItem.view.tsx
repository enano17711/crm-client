import React, { useEffect } from "react"
import { useAtom } from "jotai"
import { selectedCategoryItemAtom } from "../../store/categoryItem.atoms.ts"
import { useNavigate } from "react-router-dom"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useApiCategoryItemCategoryItemPostHook } from "../../api-gen/hooks/categoryItemController"
import { CreateCategoryItemDto } from "../../api-gen"
import CreateUpdateTopBarComponent from "../../components/CreateUpdateTopBar.component.tsx"
import { Space, Stack, Textarea, TextInput, Title } from "@mantine/core"

const CreateCategoryItemView = () => {
   const [saveType, setSaveType] = React.useState<
      "create_new" | "create_close" | "create_clone"
   >("create_new")
   const [selectedCategoryItem, setSelectedCategoryItem] = useAtom(
      selectedCategoryItemAtom,
   )
   const navigate = useNavigate()

   const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
   } = useForm<CreateCategoryItemDto>({
      defaultValues: {
         name: "",
         description: "",
      },
   })

   const { mutate } = useApiCategoryItemCategoryItemPostHook({
      mutation: {
         onSuccess: (_, variables) => {
            setSelectedCategoryItem({})
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
               navigate("/category-items")
            }
         },
      },
   })

   const onSubmit: SubmitHandler<CreateCategoryItemDto> = async (data) => {
      mutate(data as CreateCategoryItemDto)
   }

   useEffect(() => {
      if (
         selectedCategoryItem?.name !== null &&
         selectedCategoryItem?.name !== undefined
      ) {
         reset({
            name: selectedCategoryItem?.name,
            description: selectedCategoryItem?.description,
         })
      }
   }, [])

   return (
      <>
         <CreateUpdateTopBarComponent
            backRoute={"/category-items"}
            reloadEnabled={false}
            formKey={"create-categoryItem-form"}
            setSaveType={setSaveType}
         >
            <Title order={3}>Crear Categoria</Title>
         </CreateUpdateTopBarComponent>
         <Space h="sm" />
         <form id="create-categoryItem-form" onSubmit={handleSubmit(onSubmit)}>
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

export default CreateCategoryItemView
