import React, { useEffect, useState } from "react"
import { useSetAtom } from "jotai"
import { selectedUnitAtom } from "../../store/unit.atoms.ts"
import { useNavigate, useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import {
   useApiUnitUnitIdGetHook,
   useApiUnitUnitIdPutHook,
} from "../../api-gen/hooks/unitController"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { UpdateUnitDto } from "../../api-gen"
import {
   Box,
   LoadingOverlay,
   NumberInput,
   Select,
   Space,
   Stack,
   Textarea,
   TextInput,
   Title,
} from "@mantine/core"
import CreateUpdateTopBarComponent from "../../components/CreateUpdateTopBar.component.tsx"
import { useApiBaseUnitBaseUnitsGetHook } from "../../api-gen/hooks/baseUnitController"

interface IFormInputs {
   name: string
   code: string
   operation: string
   value: number
   description: string
   baseUnitId: string
}

const UpdateUnitView = () => {
   const setSelectedUnit = useSetAtom(selectedUnitAtom)
   const [saveType, setSaveType] = useState<
      "create_new" | "create_close" | "create_clone"
   >("create_new")
   const navigate = useNavigate()
   const params = useParams()

   const queryClient = useQueryClient()

   const refreshData = () => {
      queryClient.invalidateQueries([`/api/unit/unit/${params.unitId}`])
      reset({
         name: unitData.data.name,
         code: unitData.data.code,
         operation: unitData.data.operation,
         value: unitData.data.value,
         description: unitData.data.description,
         baseUnitId: unitData.data.baseUnitId.toString(),
      })
   }

   const { data: baseUnitQueryData, status: baseUnitQueryStatus } =
      useApiBaseUnitBaseUnitsGetHook({
         ColumnName: "Name",
         ColumnValue: "",
         PageNumber: 1,
         PageSize: 1000,
         OrderBy: "Name",
         OrderDirection: "ASC",
      })

   const {
      data: unitData,
      status: unitStatus,
      isFetching,
   } = useApiUnitUnitIdGetHook(Number(params.unitId))

   const { mutate: unitMutate } = useApiUnitUnitIdPutHook(
      Number(params.unitId),
      {
         mutation: {
            onSuccess: async (_, variables) => {
               if (saveType === "create_new") {
                  setSelectedUnit({})
                  navigate("/units/create")
               } else if (saveType === "create_clone") {
                  setSelectedUnit((prev) => {
                     return {
                        unitId: Number(params.unitId),
                        name: variables.name,
                        code: variables.code,
                        operation: variables.operation,
                        value: variables.value,
                        description: variables.description,
                        baseUnitId: Number(variables.baseUnitId),
                        baseUnitName: baseUnitQueryData.data.items.find(
                           (baseUnit) =>
                              baseUnit.baseUnitId ===
                              Number(variables.baseUnitId),
                        ).name,
                     }
                  })
                  navigate(`/units/create`)
               } else {
                  setSelectedUnit({})
                  reset({
                     name: "",
                     code: "",
                     operation: "",
                     value: 0,
                     description: "",
                     baseUnitId: "",
                  })
                  navigate("/units")
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
         operation: "",
         value: 0,
         description: "",
         baseUnitId: "",
      },
   })

   const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
      const unitForUpdated: UpdateUnitDto = {
         name: data.name,
         code: data.code,
         operation: data.operation,
         value: data.value,
         description: data.description,
         baseUnitId: Number(data.baseUnitId),
      }
      unitMutate(unitForUpdated)
   }

   useEffect(() => {
      if (!isFetching) {
         reset({
            name: unitData.data.name,
            code: unitData.data.code,
            operation: unitData.data.operation,
            value: unitData.data.value,
            description: unitData.data.description,
            baseUnitId: unitData.data.baseUnitId.toString(),
         })
      }
   }, [unitStatus])

   return (
      <Box pos="relative">
         {unitStatus === "loading" && (
            <LoadingOverlay visible={true} overlayBlur={2} />
         )}
         <CreateUpdateTopBarComponent
            backRoute={"/units"}
            reloadEnabled={true}
            formKey={"update-unit-form"}
            setSaveType={setSaveType}
            refreshMethod={refreshData}
         >
            <Title order={4}>Editar: {unitData?.data?.name}</Title>
         </CreateUpdateTopBarComponent>
         <Space h="sm" />
         <form id="update-unit-form" onSubmit={handleSubmit(onSubmit)}>
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
      </Box>
   )
}

export default UpdateUnitView
