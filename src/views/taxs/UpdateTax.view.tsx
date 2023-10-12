import React, { useEffect, useState } from "react"
import { useSetAtom } from "jotai"
import { selectedTaxAtom } from "../../store/tax.atoms.ts"
import { useNavigate, useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import {
   useApiTaxTaxIdGetHook,
   useApiTaxTaxIdPutHook,
} from "../../api-gen/hooks/taxController"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { UpdateTaxDto } from "../../api-gen"
import {
   Box,
   LoadingOverlay,
   NumberInput,
   Space,
   Stack,
   Textarea,
   TextInput,
   Title,
} from "@mantine/core"
import CreateUpdateTopBarComponent from "../../components/CreateUpdateTopBar.component.tsx"

interface IFormInputs {
   name: string
   rate: number
   description: string
}

const UpdateTaxView = () => {
   const setSelectedTax = useSetAtom(selectedTaxAtom)
   const [saveType, setSaveType] = useState<
      "create_new" | "create_close" | "create_clone"
   >("create_new")
   const navigate = useNavigate()
   const params = useParams()

   const queryClient = useQueryClient()

   const refreshData = () => {
      queryClient.invalidateQueries([`/api/tax/tax/${params.taxId}`])
      reset({
         name: taxData.data.name,
         rate: taxData.data.rate,
         description: taxData.data.description,
      })
   }

   const {
      data: taxData,
      status: taxStatus,
      isFetching,
   } = useApiTaxTaxIdGetHook(Number(params.taxId))

   const { mutate: taxMutate } = useApiTaxTaxIdPutHook(Number(params.taxId), {
      mutation: {
         onSuccess: async (_, variables) => {
            if (saveType === "create_new") {
               setSelectedTax({})
               navigate("/taxes/create")
            } else if (saveType === "create_clone") {
               setSelectedTax({
                  taxId: Number(params.taxId),
                  name: variables.name,
                  rate: variables.rate,
                  description: variables.description,
               })
               navigate(`/taxes/create`)
            } else {
               setSelectedTax({})
               reset({
                  name: "",
                  rate: 0,
                  description: "",
               })
               navigate("/taxes")
            }
         },
      },
   })

   const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
   } = useForm<IFormInputs>({
      defaultValues: {
         name: "",
         rate: 0,
         description: "",
      },
   })

   const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
      taxMutate(data as UpdateTaxDto)
   }

   useEffect(() => {
      if (!isFetching) {
         reset({
            name: taxData.data.name,
            rate: taxData.data.rate,
            description: taxData.data.description,
         })
      }
   }, [taxStatus])

   return (
      <Box pos="relative">
         {taxStatus === "loading" && (
            <LoadingOverlay visible={true} overlayBlur={2} />
         )}
         <CreateUpdateTopBarComponent
            backRoute={"/taxes"}
            reloadEnabled={true}
            formKey={"update-tax-form"}
            setSaveType={setSaveType}
            refreshMethod={refreshData}
         >
            <Title order={4}>Editar: {taxData?.data?.name}</Title>
         </CreateUpdateTopBarComponent>
         <Space h="sm" />
         <form id="update-tax-form" onSubmit={handleSubmit(onSubmit)}>
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
                  name="rate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <NumberInput
                        {...field}
                        label="Valor"
                        precision={2}
                        min={0}
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
                           errors.rate?.type === "required" &&
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

export default UpdateTaxView
