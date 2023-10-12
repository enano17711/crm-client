import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { UpdateBrandDto } from "../../api-gen"
import CreateUpdateTopBarComponent from "../../components/CreateUpdateTopBar.component.tsx"
import {
   Box,
   LoadingOverlay,
   Space,
   Stack,
   Textarea,
   TextInput,
   Title,
} from "@mantine/core"
import {
   useApiBrandBrandIdGetHook,
   useApiBrandBrandIdPutHook,
} from "../../api-gen/hooks/brandController"
import { useSetAtom } from "jotai"
import { selectedBrandAtom } from "../../store/brand.atoms.ts"
import { useQueryClient } from "@tanstack/react-query"

interface IFormInputs {
   name: string
   description: string
}

const UpdateBrandView = () => {
   const setSelectedBrand = useSetAtom(selectedBrandAtom)
   const [saveType, setSaveType] = useState<
      "create_new" | "create_close" | "create_clone"
   >("create_new")
   const navigate = useNavigate()
   const params = useParams()

   const queryClient = useQueryClient()

   const refreshData = () => {
      queryClient.invalidateQueries([`/api/brand/brand/${params.brandId}`])
      reset({
         name: brandData.data.name,
         description: brandData.data.description,
      })
   }

   const {
      data: brandData,
      status: brandStatus,
      isFetching,
   } = useApiBrandBrandIdGetHook(Number(params.brandId))

   const { mutate: brandMutate } = useApiBrandBrandIdPutHook(
      Number(params.brandId),
      {
         mutation: {
            onSuccess: async (_, variables) => {
               if (saveType === "create_new") {
                  setSelectedBrand({})
                  navigate("/brands/create")
               } else if (saveType === "create_clone") {
                  setSelectedBrand({
                     brandId: Number(params.brandId),
                     name: variables.name,
                     description: variables.description,
                  })
                  navigate(`/brands/create`)
               } else {
                  setSelectedBrand({})
                  reset({
                     name: "",
                     description: "",
                  })
                  navigate("/brands")
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
   } = useForm<IFormInputs>({
      defaultValues: {
         name: "",
         description: "",
      },
   })

   const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
      brandMutate(data as UpdateBrandDto)
   }

   useEffect(() => {
      if (!isFetching) {
         reset({
            name: brandData.data.name,
            description: brandData.data.description,
         })
      }
   }, [brandStatus])

   return (
      <Box pos="relative">
         {brandStatus === "loading" && (
            <LoadingOverlay visible={true} overlayBlur={2} />
         )}
         <CreateUpdateTopBarComponent
            backRoute={"/brands"}
            reloadEnabled={true}
            formKey={"update-brand-form"}
            setSaveType={setSaveType}
            refreshMethod={refreshData}
         >
            <Title order={4}>Editar: {brandData?.data?.name}</Title>
         </CreateUpdateTopBarComponent>
         <Space h="sm" />
         <form id="update-brand-form" onSubmit={handleSubmit(onSubmit)}>
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

export default UpdateBrandView
