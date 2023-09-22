import React, { useEffect, useState } from "react"
import { useAppStore } from "../../store"
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form"
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
import CustomBreadcrumbsComponent from "../../components/CustomBreadcrumbs.component.tsx"

import "devextreme/dist/css/dx.light.css"
import { useElementSize } from "@mantine/hooks"
import SubTotalSaleComponent from "./components/SubTotalSale.component.tsx"
import TaxItemDetailComponent from "./components/TaxItemDetail.component.tsx"
import TotalSaleItemDetailsComponent from "./components/TotalSaleItemDetails.component.tsx"
import { CreateSaleDto } from "../../api-services"
import NetcostSaleDetailComponent from "./components/NetcostSaleDetail.component.tsx"
import { IFormInputsForCreateSaleInterface } from "../../types/IFormInputsForCreateSale.interface.ts"
import {
   grandTotal,
   itemDetailsFormatted,
   itemsFormatted,
   orderTax,
   totalCost,
   totalDiscount,
   totalQuantity,
   totalTax,
} from "./utils/saleUtils.ts"

const routes = [
   { path: "/", title: "Inicio" },
   { path: "/sales", title: "Ventas" },
   { path: "/create-sale", title: "Crear Venta" },
]

const CreateSaleView = () => {
   const { ref, width, height } = useElementSize()
   const [valueSelect, setValueSelect] = useState<string | null>(null)
   const [itemsArray, setItemsArray] = useState([])

   const { itemsStore, customersStore, salesStore } = useAppStore()
   const { items } = itemsStore.getters
   const { customers } = customersStore.getters

   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<IFormInputsForCreateSaleInterface>({
      defaultValues: {
         itemDetails: [],
         orderTaxRate: 0,
         orderDiscount: 0,
         status: "",
         note: "",
         customerId: "",
      },
   })

   const { fields, append, remove } = useFieldArray({
      control,
      name: "itemDetails",
   })

   const onSubmit = (data: IFormInputsForCreateSaleInterface) => {
      const dataToSend: CreateSaleDto = {
         referenceNumber: "referenceNumber",
         customerId: Number(data.customerId),
         note: data.note,
         status: data.status,
         orderDiscount: data.orderDiscount,
         orderTaxRate: data.orderTaxRate,
         itemsCount: data.itemDetails.length,
         totalCost: totalCost(data),
         totalDiscount: totalDiscount(data),
         totalTax: totalTax(data),
         totalQuantity: totalQuantity(data),
         orderTax: orderTax(data),
         grandTotal: grandTotal(data),
         itemSales: itemDetailsFormatted(data),
      }
      salesStore.actions.addSale(dataToSend)
      salesStore.actions.disposeState()
   }

   const removeRow = (index: number) => {
      const copyFromItemArray = [...itemsArray]
      copyFromItemArray.splice(index, 1)

      setItemsArray(copyFromItemArray)
      remove(index)
   }

   const itemArrayForSelect: () => {
      label: string
      value: string
   }[] = () => {
      return itemsFormatted(items)
   }

   const watchStatus = useWatch({
      name: "status",
      control,
   })

   useEffect(() => {
      if (valueSelect !== null) {
         if (valueSelect.split("-").length === 11) {
            const itemBatchIdFromSelect = valueSelect.split("-")[0]
            const itemIdFromSelect = valueSelect.split("-")[1]
            const itemBatchNumberFromSelect = valueSelect.split("-")[2]
            const itemBatchDateFromSelect = valueSelect.split("-")[3]
            const itemNameFromSelect = valueSelect.split("-")[4]
            const itemCostFromSelect = valueSelect.split("-")[5]
            const itemTaxRateFromSelect = valueSelect.split("-")[6]
            const itemCodeFromSelect = valueSelect.split("-")[7]
            const itemIsBatchFromSelect = valueSelect.split("-")[8]
            const itemTaxMethodFromSelect = valueSelect.split("-")[9]
            const itemUnitCostIdFromSelect = valueSelect.split("-")[10]
            const findItemBatchInItemsArray = itemsArray.find(
               (item) =>
                  item.itemBatchId === Number.parseInt(itemBatchIdFromSelect),
            )
            if (findItemBatchInItemsArray === undefined) {
               setItemsArray([
                  ...itemsArray,
                  {
                     itemId: Number.parseInt(itemIdFromSelect),
                     itemBatchId: Number.parseInt(itemBatchIdFromSelect),
                     itemBatchNumber: itemBatchNumberFromSelect,
                     itemBatchDate: itemBatchDateFromSelect,
                     itemName: itemNameFromSelect,
                     itemPrice: itemCostFromSelect,
                     itemTaxRate: itemTaxRateFromSelect,
                     itemCode: itemCodeFromSelect,
                     quantity: 0,
                     receivedQuantity: 0,
                     discount: 0,
                     isBatch: itemIsBatchFromSelect === "true",
                     itemTaxMethod: itemTaxMethodFromSelect,
                     itemPriceId: Number.parseInt(itemUnitCostIdFromSelect),
                  },
               ])
               append({
                  itemId: Number.parseInt(itemIdFromSelect),
                  itemBatchId: Number.parseInt(itemBatchIdFromSelect),
                  itemBatchNumber: itemBatchNumberFromSelect,
                  itemBatchDate: itemBatchDateFromSelect,
                  itemName: itemNameFromSelect,
                  itemPrice: itemCostFromSelect,
                  itemTaxRate: itemTaxRateFromSelect,
                  itemCode: itemCodeFromSelect,
                  quantity: 0,
                  receivedQuantity: 0,
                  discount: 0,
                  isBatch: itemIsBatchFromSelect === "true",
                  itemTaxMethod: itemTaxMethodFromSelect,
                  itemPriceId: Number.parseInt(itemUnitCostIdFromSelect),
               })
            }
         } else {
            const itemIdFromSelect = valueSelect.split("-")[0]
            const itemNameFromSelect = valueSelect.split("-")[1]
            const itemCodeFromSelect = valueSelect.split("-")[2]
            const itemCostFromSelect = valueSelect.split("-")[3]
            const itemTaxRateFromSelect = valueSelect.split("-")[4]
            const itemIsBatchFromSelect = valueSelect.split("-")[5]
            const itemTaxMethodFromSelect = valueSelect.split("-")[6]
            const itemUnitCostIdFromSelect = valueSelect.split("-")[7]
            const filterItemBatches = itemsArray.filter(
               (item) =>
                  item.itemBatchNumber === undefined ||
                  item.itemBatchNumber === null,
            )
            const findItemInItemsArray = filterItemBatches.find(
               (item) => item.itemId === Number.parseInt(itemIdFromSelect),
            )
            if (findItemInItemsArray === undefined) {
               setItemsArray([
                  ...itemsArray,
                  {
                     itemId: Number.parseInt(itemIdFromSelect),
                     itemName: itemNameFromSelect,
                     itemPrice: itemCostFromSelect,
                     itemTaxRate: itemTaxRateFromSelect,
                     itemCode: itemCodeFromSelect,
                     quantity: 0,
                     receivedQuantity: 0,
                     discount: 0,
                     isBatch: itemIsBatchFromSelect === "true",
                     itemTaxMethod: itemTaxMethodFromSelect,
                     itemPriceId: Number.parseInt(itemUnitCostIdFromSelect),
                  },
               ])
               append({
                  itemId: Number.parseInt(itemIdFromSelect),
                  itemName: itemNameFromSelect,
                  itemPrice: itemCostFromSelect,
                  itemTaxRate: itemTaxRateFromSelect,
                  itemCode: itemCodeFromSelect,
                  quantity: 0,
                  receivedQuantity: 0,
                  discount: 0,
                  isBatch: itemIsBatchFromSelect === "true",
                  itemTaxMethod: itemTaxMethodFromSelect,
                  itemPriceId: Number.parseInt(itemUnitCostIdFromSelect),
               })
            }
         }
      }
   }, [valueSelect])

   useEffect(() => {
      if (items.length === 0) {
         itemsStore.actions.loadItems()
      }
      if (customers.length === 0) {
         customersStore.actions.loadCustomers()
      }
   }, [])

   return (
      <>
         <Space h="sm" />
         <Group position="apart">
            <CustomBreadcrumbsComponent routes={routes} />
         </Group>
         <Space h="lg" />
         <Group grow>
            <Controller
               name="customerId"
               control={control}
               rules={{ required: true }}
               render={({ field }) => (
                  <Select
                     {...field}
                     withAsterisk
                     label="Cliente"
                     searchable
                     error={
                        errors.customerId?.type === "required" &&
                        "Este campo es requerido"
                     }
                     data={
                        customers.length === 0
                           ? ["No Customers"]
                           : customers.map((customer) => {
                                return {
                                   label: customer.name,
                                   value: customer.customerId.toString(),
                                }
                             })
                     }
                  />
               )}
            />
            <Controller
               name="status"
               control={control}
               rules={{ required: true }}
               render={({ field }) => (
                  <Select
                     {...field}
                     withAsterisk
                     label="Status"
                     searchable
                     error={
                        errors.status?.type === "required" &&
                        "Este campo es requerido"
                     }
                     data={["Received", "Pending", "Partial"]}
                  />
               )}
            />
            <Controller
               name={"orderTaxRate"}
               control={control}
               rules={{ required: true }}
               render={({ field }) => (
                  <NumberInput
                     {...field}
                     label="Sale Tax"
                     miw={150}
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
                        errors?.orderTaxRate?.type === "required" &&
                        "Este campo es requerido"
                     }
                  />
               )}
            />
            <Controller
               name={"orderDiscount"}
               control={control}
               rules={{ required: true }}
               render={({ field }) => (
                  <NumberInput
                     {...field}
                     label="Sale Discount"
                     miw={150}
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
                        errors?.orderDiscount?.type === "required" &&
                        "Este campo es requerido"
                     }
                  />
               )}
            />
         </Group>
         <Space h="md" />
         <Group grow ref={ref}>
            <Select
               label="Selecciona el item"
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
                        <th>Code</th>
                        <th>Batch</th>
                        <th>Expiration</th>
                        <th>Quantity</th>
                        <th
                           style={{
                              display: watchStatus !== "Partial" ? "none" : "",
                           }}
                        >
                           Received
                        </th>
                        <th>Net Unit Cost</th>
                        <th>Tax</th>
                        <th>Discount</th>
                        <th>SubTotal</th>
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
                                          readOnly
                                          variant="filled"
                                          miw={160}
                                       />
                                    )}
                                 />
                              </Box>
                              <Box component="td" pr={10} pb={5}>
                                 <Controller
                                    name={`itemDetails.${index}.itemCode`}
                                    control={control}
                                    render={({ field }) => (
                                       <TextInput
                                          {...field}
                                          readOnly
                                          variant="filled"
                                          miw={160}
                                       />
                                    )}
                                 />
                              </Box>
                              <Box component="td" pr={10} pb={5}>
                                 <Controller
                                    name={`itemDetails.${index}.itemBatchNumber`}
                                    control={control}
                                    render={({ field }) => (
                                       <TextInput
                                          {...field}
                                          readOnly
                                          variant="filled"
                                          miw={160}
                                       />
                                    )}
                                 />
                              </Box>
                              <Box component="td" pr={10} pb={5}>
                                 <Controller
                                    name={`itemDetails.${index}.itemBatchDate`}
                                    control={control}
                                    render={({ field }) => (
                                       <TextInput
                                          {...field}
                                          readOnly
                                          variant="filled"
                                          miw={120}
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
                              <Box
                                 component="td"
                                 pr={10}
                                 pb={5}
                                 style={{
                                    display:
                                       watchStatus !== "Partial" ? "none" : "",
                                 }}
                              >
                                 <Controller
                                    name={`itemDetails.${index}.receivedQuantity`}
                                    control={control}
                                    rules={{
                                       required: watchStatus === "Partial",
                                    }}
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
                              <Box component="td" pr={10} pb={5}>
                                 <NetcostSaleDetailComponent
                                    index={index}
                                    control={control}
                                 />
                              </Box>
                              <Box component="td" pr={10} pb={5}>
                                 <TaxItemDetailComponent
                                    index={index}
                                    control={control}
                                 />
                              </Box>
                              <Box component="td" pr={10} pb={5}>
                                 <Controller
                                    name={`itemDetails.${index}.discount`}
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
                              <Box component="td" pr={10} pb={5}>
                                 <SubTotalSaleComponent
                                    index={index}
                                    control={control}
                                 />
                              </Box>

                              <Box component="td" pb={5}>
                                 <Button onClick={() => removeRow(index)}>
                                    DELETE
                                 </Button>
                              </Box>
                           </Box>
                        )
                     })}
                  </tbody>
                  <tfoot>
                     <TotalSaleItemDetailsComponent control={control} />
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

export default CreateSaleView
