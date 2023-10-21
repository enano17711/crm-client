import React, { useEffect } from "react"
import {
   NumberInput,
   Select,
   Space,
   Stack,
   Textarea,
   TextInput,
   Title,
} from "@mantine/core"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { CreateUnitDto } from "../../api-gen"
import { useNavigate } from "react-router-dom"
import CreateUpdateTopBarComponent from "../../components/CreateUpdateTopBar.component.tsx"
import { useAtom } from "jotai"
import { selectedUnitAtom } from "../../store/unit.atoms.ts"
import { useApiUnitUnitPostHook } from "../../api-gen/hooks/unitController"
import { useApiBaseUnitBaseUnitsGetHook } from "../../api-gen/hooks/baseUnitController"

interface IFormInputs {
   name: string
   code: string
   operation: string
   value: number
   description: string
   baseUnitId: string
}

const CreateUnitView = () => {
   const [saveType, setSaveType] = React.useState<
      "create_new" | "create_close" | "create_clone"
   >("create_new")
   const [selectedUnit, setSelectedUnit] = useAtom(selectedUnitAtom)
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
         operation: "",
         value: 0,
         baseUnitId: "",
         description: "",
      },
   })

   const { data: baseUnitQueryData, status: baseUnitQueryStatus } =
      useApiBaseUnitBaseUnitsGetHook({
         ColumnName: "Name",
         ColumnValue: "",
         PageNumber: 1,
         PageSize: 1000,
         OrderBy: "Name",
         OrderDirection: "ASC",
      })

   const { mutate } = useApiUnitUnitPostHook({
      mutation: {
         onSuccess: (_, variables) => {
            setSelectedUnit({})
            if (saveType === "create_new") {
               reset({
                  name: "",
                  code: "",
                  operation: "",
                  value: 0,
                  baseUnitId: "",
                  description: "",
               })
            } else if (saveType === "create_clone") {
               reset({
                  name: variables.name,
                  code: variables.code,
                  operation: variables.operation,
                  value: variables.value,
                  description: variables.description,
                  baseUnitId: variables.baseUnitId.toString(),
               })
            } else {
               reset({
                  name: "",
                  code: "",
                  operation: "",
                  value: 0,
                  baseUnitId: "",
                  description: "",
               })
               navigate("/units")
            }
         },
      },
   })

   const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
      const unitForCreate: CreateUnitDto = {
         name: data.name,
         code: data.code,
         operation: data.operation,
         value: data.value,
         description: data.description,
         baseUnitId: Number(data.baseUnitId),
      }
      mutate(unitForCreate)
   }

   useEffect(() => {
      if (selectedUnit?.name !== null && selectedUnit?.name !== undefined) {
         reset({
            name: selectedUnit?.name,
            code: selectedUnit?.code,
            operation: selectedUnit?.operation,
            value: selectedUnit?.value,
            baseUnitId: selectedUnit?.baseUnitId.toString(),
            description: selectedUnit?.description,
         })
      }
   }, [])

   return (
      <>
         <CreateUpdateTopBarComponent
            backRoute={"/units"}
            reloadEnabled={false}
            formKey={"create-unit-form"}
            setSaveType={setSaveType}
         >
            <Title order={3}>Crear Unidad</Title>
         </CreateUpdateTopBarComponent>
         <Space h="sm" />
         <form id="create-unit-form" onSubmit={handleSubmit(onSubmit)}>
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
                  name="code"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <TextInput
                        {...field}
                        label="Codigo"
                        placeholder="Coca-Cola"
                        withAsterisk
                        error={
                           errors.code?.type === "required" &&
                           "Este campo es harmonido"
                        }
                     />
                  )}
               />
               <Controller
                  name="baseUnitId"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <Select
                        {...field}
                        withAsterisk
                        label="U. Base"
                        searchable
                        error={
                           errors.baseUnitId?.type === "required" &&
                           "Este campo es requerido"
                        }
                        data={
                           baseUnitQueryStatus === "success"
                              ? baseUnitQueryData?.data?.items?.map((bu) => {
                                   return {
                                      label: bu.name,
                                      value: bu.baseUnitId.toString(),
                                   }
                                })
                              : baseUnitQueryStatus === "loading"
                              ? ["Cargando"]
                              : []
                        }
                     />
                  )}
               />
               <Controller
                  name="operation"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <Select
                        {...field}
                        withAsterisk
                        label="Operacion"
                        searchable
                        error={
                           errors.operation?.type === "required" &&
                           "Este campo es requerido"
                        }
                        data={[
                           { label: "Suma", value: "+" },
                           { label: "Resta", value: "-" },
                           { label: "Multiplicación", value: "*" },
                           { label: "Division", value: "/" },
                        ]}
                     />
                  )}
               />
               <Controller
                  name="value"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <NumberInput
                        {...field}
                        label="Valor"
                        precision={2}
                        min={0}
                        max={4294967295}
                        withAsterisk
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        formatter={(value) =>
                           !Number.isNaN(parseFloat(value))
                              ? `${value}`.replace(
                                   /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                   ",",
                                )
                              : ""
                        }
                        error={
                           errors.value?.type === "required" &&
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

export default CreateUnitView
