import React, { useEffect } from "react"
import { useAtom } from "jotai/index"
import { useNavigate } from "react-router-dom"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { selectedItemBatchedAtom } from "../../store/itemBatch.atoms.ts"
import {
   useApiItemItemBatchPostHook,
   useApiItemItemsGetHook,
} from "../../api-gen/hooks/itemController"
import { CreateItemBatchDto } from "../../api-gen"
import CreateUpdateTopBarComponent from "../../components/CreateUpdateTopBar.component.tsx"
import { Select, Space, Stack, TextInput, Title } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"

interface IFormInputs {
   batchNumber: string
   batchDate: Date
   itemId: string
}
const CreateItemBatchView = () => {
   const [saveType, setSaveType] = React.useState<
      "create_new" | "create_close" | "create_clone"
   >("create_new")
   const [selectedItemBatch, setSelectedItemBatch] = useAtom(
      selectedItemBatchedAtom,
   )
   const navigate = useNavigate()

   const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
   } = useForm<IFormInputs>({
      defaultValues: {
         batchNumber: "",
         batchDate: new Date(),
         itemId: "",
      },
   })

   const { data: itemQueryData, status: itemQueryStatus } =
      useApiItemItemsGetHook({
         ColumnName: "Name",
         ColumnValue: "",
         PageNumber: 1,
         PageSize: 1000,
         OrderBy: "Name",
         OrderDirection: "ASC",
      })

   const { mutate } = useApiItemItemBatchPostHook({
      mutation: {
         onSuccess: (_, variables) => {
            setSelectedItemBatch({})
            if (saveType === "create_new") {
               reset({
                  batchNumber: "",
                  batchDate: new Date(),
                  itemId: "",
               })
            } else if (saveType === "create_clone") {
               reset({
                  batchNumber: variables.batchNumber,
                  batchDate: variables.batchDate,
                  itemId: variables.itemId.toString(),
               })
            } else {
               reset({
                  batchNumber: "",
                  batchDate: new Date(),
                  itemId: "",
               })
               navigate("/items")
            }
         },
      },
   })

   const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
      const itemBatchForCreate: CreateItemBatchDto = {
         batchNumber: data.batchNumber,
         batchDate: data.batchDate,
         itemId: Number(data.itemId),
      }
      mutate(itemBatchForCreate)
   }

   useEffect(() => {
      if (
         selectedItemBatch?.batchNumber !== null &&
         selectedItemBatch?.batchNumber !== undefined
      ) {
         reset({
            batchNumber: selectedItemBatch?.batchNumber,
            batchDate: new Date(selectedItemBatch?.batchDate),
            itemId: selectedItemBatch?.item.itemId.toString(),
         })
      }
   }, [])

   return (
      <>
         <CreateUpdateTopBarComponent
            backRoute={"/items"}
            reloadEnabled={false}
            formKey={"create-item-batch-form"}
            setSaveType={setSaveType}
         >
            <Title order={3}>Crear Item Batch</Title>
         </CreateUpdateTopBarComponent>
         <Space h="sm" />
         <form id="create-item-batch-form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="sm">
               <Controller
                  name="itemId"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <Select
                        {...field}
                        withAsterisk
                        label="Item"
                        searchable
                        maxDropdownHeight={150}
                        error={
                           errors.itemId?.type === "required" &&
                           "Este campo es requerido"
                        }
                        data={
                           itemQueryStatus === "loading"
                              ? ["Cargando"]
                              : itemQueryData?.data?.items?.map((item) => {
                                   return {
                                      label: item.name,
                                      value: item.itemId.toString(),
                                   }
                                })
                        }
                     />
                  )}
               />
               <Controller
                  name="batchNumber"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <TextInput
                        label="Batch Number"
                        {...field}
                        withAsterisk
                        error={
                           errors.batchNumber?.type === "required" &&
                           "Este campo es requerido"
                        }
                     />
                  )}
               />
               <Controller
                  name="batchDate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <DatePickerInput
                        {...field}
                        label="Batch Date"
                        withAsterisk
                        dropdownType="modal"
                        error={
                           errors.batchDate?.type === "required" &&
                           "Este campo es requerido"
                        }
                     />
                  )}
               />
            </Stack>
         </form>
      </>
   )
}

export default CreateItemBatchView
