import React, { useEffect, useState } from "react"
import { useSetAtom } from "jotai/index"
import { selectedBaseUnitAtom } from "../../store/baseUnit.atoms.ts"
import { useNavigate, useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import {
   useApiBaseUnitBaseUnitIdGetHook,
   useApiBaseUnitBaseUnitIdPutHook,
} from "../../api-gen/hooks/baseUnitController"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { UpdateBaseUnitDto } from "../../api-services"
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
import TabsBaseUnitComponent from "./components/TabsBaseUnit.component.tsx"

interface IFormInputs {
   name: string
   code: string
   description: string
}

// TODO: IMPLEMENT TABS

const UpdateBaseUnitView = () => {
   const setSelectedBaseUnit = useSetAtom(selectedBaseUnitAtom)
   const [saveType, setSaveType] = useState<
      "create_new" | "create_close" | "create_clone"
   >("create_new")
   const navigate = useNavigate()
   const params = useParams()

   const queryClient = useQueryClient()

   const refreshData = () => {
      queryClient.invalidateQueries([
         `/api/base-unit/base-unit/${params.baseUnitId}`,
      ])
      reset({
         name: baseUnitData.data.name,
         code: baseUnitData.data.code,
         description: baseUnitData.data.description,
      })
   }

   const {
      data: baseUnitData,
      status: baseUnitStatus,
      isFetching,
   } = useApiBaseUnitBaseUnitIdGetHook(Number(params.baseUnitId))

   const { mutate: baseUnitMutate } = useApiBaseUnitBaseUnitIdPutHook(
      Number(params.baseUnitId),
      {
         mutation: {
            onSuccess: async (_, variables) => {
               if (saveType === "create_new") {
                  setSelectedBaseUnit({})
                  navigate("/base-units/create")
               } else if (saveType === "create_clone") {
                  setSelectedBaseUnit({
                     baseUnitId: Number(params.baseUnitId),
                     name: variables.name,
                     code: variables.code,
                     description: variables.description,
                  })
                  navigate(`/base-units/create`)
               } else {
                  setSelectedBaseUnit({})
                  reset({
                     name: "",
                     code: "",
                     description: "",
                  })
                  navigate("/base-units")
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
         code: "",
         description: "",
      },
   })

   const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
      baseUnitMutate(data as UpdateBaseUnitDto)
   }

   useEffect(() => {
      if (!isFetching) {
         reset({
            name: baseUnitData.data.name,
            code: baseUnitData.data.code,
            description: baseUnitData.data.description,
         })
      }
   }, [baseUnitStatus])

   return (
      <Box pos="relative">
         {baseUnitStatus === "loading" && (
            <LoadingOverlay visible={true} overlayBlur={2} />
         )}
         <CreateUpdateTopBarComponent
            backRoute={"/base-units"}
            reloadEnabled={true}
            formKey={"update-baseUnit-form"}
            setSaveType={setSaveType}
            refreshMethod={refreshData}
         >
            <Title order={4}>Editar: {baseUnitData?.data?.name}</Title>
         </CreateUpdateTopBarComponent>
         <Space h="sm" />
         <form id="update-baseUnit-form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="sm">
               <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <TextInput
                        {...field}
                        label="Nombre"
                        placeholder="Milimetro"
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
                        placeholder="Ml"
                        withAsterisk
                        error={
                           errors.code?.type === "required" &&
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
                        placeholder="unidad base para milimetro"
                        autosize
                        minRows={6}
                        maxRows={10}
                     />
                  )}
               />
            </Stack>
         </form>
         <Space h="lg" />
         <TabsBaseUnitComponent />
      </Box>
   )
}

export default UpdateBaseUnitView
