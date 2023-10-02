import React, { useEffect } from "react"
import { Space, Stack, Textarea, TextInput, Title } from "@mantine/core"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { feature, getAPI } from "../../axios-utils.ts"
import { BrandApi, CreateBrandDto } from "../../api-services"
import { errorNotification, successNotification } from "../../utils"
import { useNavigate, useParams } from "react-router-dom"
import BasicCreateUpdateTopBarComponent from "../../components/BasicCreateUpdateTopBar.component.tsx"

interface IFormInputs {
   name: string
   description: string
}

const CreateBrandView = () => {
   const [saveType, setSaveType] = React.useState<
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
      const [err, res] = await feature(
         getAPI(BrandApi).apiBrandBrandPost(data as CreateBrandDto),
      )
      if (err) {
         errorNotification(err.message)
      } else {
         successNotification()
         if (saveType === "create_new") {
            reset({
               name: "",
               description: "",
            })
         } else if (saveType === "create_clone") {
            reset({
               name: data.name,
               description: data.description,
            })
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
      console.log(params["name"])
      if (params["name"] !== null && params["description"] !== null) {
         reset({
            name: params["name"],
            description: params["description"],
         })
      }
   }, [])

   return (
      <>
         <BasicCreateUpdateTopBarComponent
            backRoute={"/brands"}
            reloadEnabled={false}
            setSaveType={setSaveType}
         >
            <Title order={3}>Crear Marca</Title>
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
      </>
   )
}

export default CreateBrandView
