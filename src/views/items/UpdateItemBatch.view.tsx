import React, { useEffect, useState } from "react"
import { useSetAtom } from "jotai"
import { useNavigate, useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { selectedItemBatchedAtom } from "../../store/itemBatch.atoms.ts"
import {
   useApiItemItemBatchByIdIdGetHook,
   useApiItemItemBatchIdPutHook,
   useApiItemItemsGetHook,
} from "../../api-gen/hooks/itemController"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { UpdateItemBatchDto } from "../../api-gen"
import {
   Box,
   LoadingOverlay,
   Select,
   Space,
   Stack,
   TextInput,
   Title,
} from "@mantine/core"
import CreateUpdateTopBarComponent from "../../components/CreateUpdateTopBar.component.tsx"
import { DatePickerInput } from "@mantine/dates"

interface IFormInputs {
   batchNumber: string
   batchDate: Date
   itemId: string
}

const UpdateItemBatchView = () => {
   const setSelectedItemBatch = useSetAtom(selectedItemBatchedAtom)
   const [saveType, setSaveType] = useState<
      "create_new" | "create_close" | "create_clone"
   >("create_new")
   const navigate = useNavigate()
   const params = useParams()

   const queryClient = useQueryClient()

   const {
      data: itemBatchData,
      status: itemBatchStatus,
      isFetching,
   } = useApiItemItemBatchByIdIdGetHook(Number(params.itemBatchId))

   const refreshData = () => {
      queryClient.invalidateQueries([
         `/api/item/item-batch-by-id/${params.itemId}`,
      ])
      reset({
         batchNumber: itemBatchData?.data?.batchNumber,
         batchDate: itemBatchData?.data?.batchDate,
         itemId: itemBatchData?.data?.item.itemId.toString(),
      })
   }

   const { data: itemQueryData, status: itemQueryStatus } =
      useApiItemItemsGetHook({
         ColumnName: "Name",
         ColumnValue: "",
         PageNumber: 1,
         PageSize: 1000,
         OrderBy: "Name",
         OrderDirection: "ASC",
      })

   const { mutate: itemBatchMutate } = useApiItemItemBatchIdPutHook(
      Number(params.itemBatchId),
      {
         mutation: {
            onSuccess: async (_, variables) => {
               if (saveType === "create_new") {
                  setSelectedItemBatch({})
                  navigate("/items/create-batch")
               } else if (saveType === "create_clone") {
                  setSelectedItemBatch((prev) => {
                     return {
                        ...prev,
                        itemBatchId: Number(params.itemBatchId),
                        batchNumber: variables.batchNumber,
                        batchDate: variables.batchDate,
                        itemId: variables.itemId.toString(),
                        item: itemQueryData.data.items.find(
                           (item) => item.itemId === variables.itemId,
                        ),
                     }
                  })
                  navigate(`/items/create-batch`)
               } else {
                  setSelectedItemBatch({})
                  reset({
                     batchNumber: "",
                     batchDate: new Date(),
                     itemId: "",
                  })
                  navigate("/items")
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
         batchNumber: "",
         batchDate: new Date(),
         itemId: "",
      },
   })

   const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
      const itemBatchForUpdate: UpdateItemBatchDto = {
         batchNumber: data.batchNumber,
         batchDate: data.batchDate,
         itemId: Number(data.itemId),
      }
      itemBatchMutate(itemBatchForUpdate)
   }

   useEffect(() => {
      if (!isFetching) {
         reset({
            batchNumber: itemBatchData?.data?.batchNumber,
            batchDate: new Date(itemBatchData?.data?.batchDate),
            itemId: itemBatchData?.data?.item.itemId.toString(),
         })
      }
   }, [itemBatchStatus])

   return (
      <Box>
         {itemBatchStatus === "loading" && (
            <LoadingOverlay visible={true} overlayBlur={2} />
         )}
         <CreateUpdateTopBarComponent
            backRoute={"/items"}
            reloadEnabled={true}
            formKey={"update-item-batch-form"}
            setSaveType={setSaveType}
            refreshMethod={refreshData}
         >
            <Title order={4}>
               Editar Item Batch: {itemBatchData?.data?.batchNumber}
            </Title>
         </CreateUpdateTopBarComponent>
         <Space h="sm" />
         <form id="update-item-batch-form" onSubmit={handleSubmit(onSubmit)}>
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
      </Box>
   )
}

export default UpdateItemBatchView
