import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppStore } from "../../../store"
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form"
import { CreateAdjustmentDto } from "../../../api-services"
import {
   Box,
   Button,
   Group,
   NumberInput,
   ScrollArea,
   Select,
   Space,
   Table,
   Textarea,
   TextInput,
} from "@mantine/core"
import { useElementSize } from "@mantine/hooks"

interface IFormInputs {
   itemsCount: number
   totalQuantity: number
   note: string
   itemDetails: {
      quantity: number
      action: string
      itemId?: number | null
      itemName?: string
      itemBatchId?: number | null
      batchNumber?: string
      batchDate?: string
   }[]
}

const CreateAdjustmentBatchedComponent = () => {
   const navigate = useNavigate()

   const { ref, width, height } = useElementSize()

   const [valueSelect, setValueSelect] = useState<string | null>(null)
   const [itemsArray, setItemsArray] = useState([])

   const { itemsStore, adjustmentsStore } = useAppStore()
   const { items } = itemsStore.getters

   const {
      reset,
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<IFormInputs>({
      defaultValues: {
         itemDetails: [],
         itemsCount: 0,
         totalQuantity: 0,
         note: "",
      },
   })

   const { fields, append, remove } = useFieldArray({
      control,
      name: "itemDetails",
   })

   const onSubmit = (data: IFormInputs) => {
      const dataToSend: CreateAdjustmentDto = {
         referenceNumber: "referenceNumber",
         itemsCount: data.itemDetails.length,
         totalQuantity: data.itemDetails.reduce(
            (acc, item) => acc + item.quantity,
            0,
         ),
         note: data.note,
         itemAdjustments: data.itemDetails,
      }
      adjustmentsStore.actions.addAdjustment(dataToSend)
      adjustmentsStore.actions.disposeState()
      reset()
      navigate("/adjustments")
   }

   const removeRow = (index: number, itemName: string) => {
      setItemsArray(itemsArray.filter((item) => item.itemName !== itemName))
      remove(index)
   }

   const Total = () => {
      const formValues = useWatch({
         name: "itemDetails",
         control,
      })
      const totalItems = formValues.length
      const totalQuantityItems = Number(
         Number(
            formValues.reduce(
               (acc, item) =>
                  Number(
                     Number(
                        acc + item.quantity === null ||
                           item.quantity === undefined
                           ? 0
                           : item.quantity,
                     ).toFixed(2),
                  ),
               0,
            ),
         ).toFixed(2),
      )
      return (
         <tr>
            <th>Total Items: {totalItems}</th>
            <th></th>
            <th></th>
            <th></th>
            <th>
               Total Qty:{" "}
               {typeof totalQuantityItems === "number"
                  ? totalQuantityItems.toFixed(2)
                  : 0}
            </th>
         </tr>
      )
   }
   const itemArrayForSelect: () => { label: string; value: string }[] = () => {
      return items.flatMap((item) =>
         item.itemBatches.map((itemBatch) => {
            const localDateBatch = new Date(itemBatch.batchDate)
            return {
               label: `${item.name} - ${itemBatch.batchNumber}`,
               value: `${itemBatch.itemBatchId.toString()}-${item.itemId.toString()}-${
                  itemBatch.batchNumber
               }-${localDateBatch.toLocaleDateString()}`,
            }
         }),
      )
   }

   useEffect(() => {
      if (valueSelect !== null) {
         const itemBatchIdFromSelect = valueSelect.split("-")[0]
         const itemIdFromSelect = valueSelect.split("-")[1]
         const itemBatchNumberFromSelect = valueSelect.split("-")[2]
         const itemBatchDateFromSelect = valueSelect.split("-")[3]
         if (
            itemsArray.find(
               (item) =>
                  item.itemBatchId === Number.parseInt(itemBatchIdFromSelect),
            ) === undefined
         ) {
            setItemsArray([
               ...itemsArray,
               {
                  itemId: Number.parseInt(itemIdFromSelect),
                  itemBatchId: Number.parseInt(itemBatchIdFromSelect),
                  itemName: items.find(
                     (item) =>
                        item.itemId === Number.parseInt(itemIdFromSelect),
                  )?.name,
                  batchNumber: itemBatchNumberFromSelect,
                  batchDate: itemBatchDateFromSelect,
               },
            ])
            append({
               itemId: Number.parseInt(itemIdFromSelect),
               itemBatchId: Number.parseInt(itemBatchIdFromSelect),
               batchNumber: itemBatchNumberFromSelect,
               batchDate: itemBatchDateFromSelect,
               itemName: items.find(
                  (item) => item.itemId === Number.parseInt(itemIdFromSelect),
               )?.name,
               action: "Add",
               quantity: 0,
            })
         }
      }
   }, [valueSelect])

   useEffect(() => {
      if (items.length === 0) {
         itemsStore.actions.loadItems()
      }
   }, [])
   return (
      <>
         <Group grow ref={ref}>
            <Select
               label="Selecciona el item Batch"
               searchable
               value={valueSelect}
               onChange={setValueSelect}
               data={
                  itemArrayForSelect().length === 0
                     ? ["No Items"]
                     : itemArrayForSelect()
               }
            />
         </Group>
         <Space h="md" />
         <form onSubmit={handleSubmit(onSubmit)}>
            <Table>
               <ScrollArea w={width} mih={155} pb="md">
                  <thead>
                     <tr>
                        <th>Item</th>
                        <th>Nro. Batch</th>
                        <th>Exp Date</th>
                        <th>Action</th>
                        <th>Quantity</th>
                        <th>Delete</th>
                     </tr>
                  </thead>
                  <tbody>
                     {fields.map((field, index) => {
                        return (
                           <Box component="tr" key={field.id}>
                              <Box component="td" pr={10} pb={5}>
                                 <Controller
                                    name={`itemDetails.${index}.itemName`}
                                    control={control}
                                    render={({ field }) => (
                                       <TextInput
                                          {...field}
                                          miw={200}
                                          readOnly
                                       />
                                    )}
                                 />
                              </Box>
                              <Box component="td" pr={10} pb={5}>
                                 <Controller
                                    name={`itemDetails.${index}.batchNumber`}
                                    control={control}
                                    render={({ field }) => (
                                       <TextInput
                                          {...field}
                                          miw={200}
                                          readOnly
                                       />
                                    )}
                                 />
                              </Box>
                              <Box component="td" pr={10} pb={5}>
                                 <Controller
                                    name={`itemDetails.${index}.batchDate`}
                                    control={control}
                                    render={({ field }) => (
                                       <TextInput
                                          {...field}
                                          readOnly
                                          miw={120}
                                       />
                                    )}
                                 />
                              </Box>
                              <Box component="td" pr={10} pb={5}>
                                 <Controller
                                    name={`itemDetails.${index}.action`}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                       <Select
                                          data={["Add", "Remove"]}
                                          {...field}
                                          miw={120}
                                          withAsterisk
                                          error={
                                             errors?.itemDetails?.[index]
                                                ?.action?.type === "required" &&
                                             "Este campo es requerido"
                                          }
                                       />
                                    )}
                                 />
                              </Box>
                              <Box component="td" pr={10} pb={5}>
                                 <Controller
                                    name={`itemDetails.${index}.quantity`}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                       <NumberInput
                                          {...field}
                                          miw={150}
                                          precision={2}
                                          min={0}
                                          max={4294967295}
                                          withAsterisk
                                          parser={(value) =>
                                             value.replace(/\$\s?|(,*)/g, "")
                                          }
                                          formatter={(value) =>
                                             !Number.isNaN(parseFloat(value))
                                                ? `${value}`.replace(
                                                     /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                                     ",",
                                                  )
                                                : ""
                                          }
                                          error={
                                             errors?.itemDetails?.[index]
                                                ?.quantity?.type ===
                                                "required" &&
                                             "Este campo es requerido"
                                          }
                                       />
                                    )}
                                 />
                              </Box>
                              <Box component="td" pb={5}>
                                 <Button
                                    onClick={() =>
                                       removeRow(index, field.itemName)
                                    }
                                 >
                                    DELETE
                                 </Button>
                              </Box>
                           </Box>
                        )
                     })}
                  </tbody>
                  <tfoot>
                     <Total />
                  </tfoot>
               </ScrollArea>
            </Table>
            <Space h="md" />
            <Controller
               name="note"
               control={control}
               rules={{ required: true }}
               render={({ field }) => (
                  <Textarea
                     {...field}
                     label="Nota"
                     minRows={4}
                     withAsterisk
                     error={
                        errors?.note?.type === "required" &&
                        "Este campo es requerido"
                     }
                  />
               )}
            />
            <Space h="md" />
            <Button type="submit">Submit</Button>
         </form>
      </>
   )
}

export default CreateAdjustmentBatchedComponent
