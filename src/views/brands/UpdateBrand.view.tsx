import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { feature, getAPI } from "../../axios-utils.ts"
import {
   BrandApi,
   BrandSimpleDto,
   CreateBrandDto,
   UpdateBrandDto,
} from "../../api-services"
import { errorNotification, successNotification } from "../../utils"
import BasicCreateUpdateTopBarComponent from "../../components/BasicCreateUpdateTopBar.component.tsx"
import {
   Box,
   LoadingOverlay,
   Space,
   Stack,
   Textarea,
   TextInput,
   Title,
} from "@mantine/core"

interface IFormInputs {
   name: string
   description: string
}

const UpdateBrandView = () => {
   const [loading, setLoading] = useState(false)
   const [data, setData] = useState<BrandSimpleDto>(null)
   const [saveType, setSaveType] = useState<
      "create_new" | "create_close" | "create_clone"
   >("create_new")
   const navigate = useNavigate()
   const params = useParams()

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

   const onSubmit: SubmitHandler<IFormInputs> = async (data, event) => {
      const brandId = Number(params.brandId)
      const [err, res] = await feature(
         getAPI(BrandApi).apiBrandBrandIdPut(brandId, data as UpdateBrandDto),
      )
      if (err) {
         errorNotification(err.message)
      } else {
         successNotification()
         if (saveType === "create_new") {
            navigate("/brands/create")
         } else if (saveType === "create_clone") {
            navigate(`/brands/create/${data.name}/${data.description}`)
         } else {
            reset({
               name: "",
               description: "",
            })
            navigate("/brands")
         }
      }
   }

   useEffect(() => {
      const brandId = Number(params.brandId)
      setLoading(true)
      getAPI(BrandApi)
         .apiBrandBrandIdGet(brandId)
         .then((res) => {
            reset({
               name: res.data.data.name,
               description: res.data.data.description,
            })
            setData(res.data.data)
            successNotification()
         })
         .catch((err) => {
            errorNotification(err.message)
         })
         .finally(() => {
            setLoading(false)
         })
   }, [])

   return (
      <Box pos="relative">
         <LoadingOverlay visible={loading} />
         <BasicCreateUpdateTopBarComponent
            backRoute={"/brands"}
            reloadEnabled={false}
            setSaveType={setSaveType}
         >
            <Title order={4}>Editar: {data?.name}</Title>
         </BasicCreateUpdateTopBarComponent>
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
      </Box>
   )
}

export default UpdateBrandView
