import React, { useEffect, useState } from "react"
import { useSetAtom } from "jotai"
import { selectedCategoryItemAtom } from "../../store/categoryItem.atoms.ts"
import { useNavigate, useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import {
   useApiCategoryItemCategoryItemIdGetHook,
   useApiCategoryItemCategoryItemIdPutHook,
} from "../../api-gen/hooks/categoryItemController"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { UpdateCategoryItemDto } from "../../api-gen"
import {
   Box,
   LoadingOverlay,
   Space,
   Stack,
   Textarea,
   TextInput,
   Title,
} from "@mantine/core"
import CreateUpdateTopBarComponent from "../../components/CreateUpdateTopBar.component.tsx"

const UpdateCategoryItemView = () => {
   const setSelectedCategoryItem = useSetAtom(selectedCategoryItemAtom)
   const [saveType, setSaveType] = useState<
      "create_new" | "create_close" | "create_clone"
   >("create_new")
   const navigate = useNavigate()
   const params = useParams()

   const queryClient = useQueryClient()

   const refreshData = () => {
      queryClient.invalidateQueries([
         `/api/category-item/category-item/${params.categoryItemId}`,
      ])
      reset({
         name: categoryItemData.data.name,
         description: categoryItemData.data.description,
      })
   }

   const {
      data: categoryItemData,
      status: categoryItemStatus,
      isFetching,
   } = useApiCategoryItemCategoryItemIdGetHook(Number(params.categoryItemId))

   const { mutate: categoryItemMutate } =
      useApiCategoryItemCategoryItemIdPutHook(Number(params.categoryItemId), {
         mutation: {
            onSuccess: async (_, variables) => {
               if (saveType === "create_new") {
                  setSelectedCategoryItem({})
                  navigate("/category-items/create")
               } else if (saveType === "create_clone") {
                  setSelectedCategoryItem({
                     categoryItemId: Number(params.categoryItemId),
                     name: variables.name,
                     description: variables.description,
                  })
                  navigate(`/category-items/create`)
               } else {
                  setSelectedCategoryItem({})
                  reset({
                     name: "",
                     description: "",
                  })
                  navigate("/category-items")
               }
            },
         },
      })

   const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
   } = useForm<UpdateCategoryItemDto>({
      defaultValues: {
         name: "",
         description: "",
      },
   })

   const onSubmit: SubmitHandler<UpdateCategoryItemDto> = async (data) => {
      categoryItemMutate(data as UpdateCategoryItemDto)
   }

   useEffect(() => {
      if (!isFetching) {
         reset({
            name: categoryItemData.data.name,
            description: categoryItemData.data.description,
         })
      }
   }, [categoryItemStatus])

   return (
      <Box pos="relative">
         {categoryItemStatus === "loading" && (
            <LoadingOverlay visible={true} overlayBlur={2} />
         )}
         <CreateUpdateTopBarComponent
            backRoute={"/category-items"}
            reloadEnabled={true}
            formKey={"update-categoryItem-form"}
            setSaveType={setSaveType}
            refreshMethod={refreshData}
         >
            <Title order={4}>Editar: {categoryItemData?.data?.name}</Title>
         </CreateUpdateTopBarComponent>
         <Space h="sm" />
         <form id="update-categoryItem-form" onSubmit={handleSubmit(onSubmit)}>
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
      </Box>
   )
}

export default UpdateCategoryItemView
