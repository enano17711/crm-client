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
import SubTotalOrderComponent from "./components/SubTotalOrder.component.tsx"
import TaxItemDetailComponent from "./components/TaxItemDetail.component.tsx"
import TotalOrderItemDetailsComponent from "./components/TotalOrderItemDetails.component.tsx"
import { CreateOrderDto } from "../../api-services"
import NetcostOrderDetailComponent from "./components/NetcostOrderDetail.component.tsx"
import { IFormInputsForCreateOrderInterface } from "../../types/IFormInputsForCreateOrder.interface.ts"
import {
   grandTotal,
   itemDetailsFormatted,
   itemsFormatted,
   orderTax,
   totalCost,
   totalDiscount,
   totalQuantity,
   totalTax,
} from "./utils/orderUtils.ts"
import { DatePickerInput } from "@mantine/dates"

const routes = [
   { path: "/", title: "Inicio" },
   { path: "/orders", title: "Compras" },
   { path: "/create-order", title: "Crear Compra" },
]

const CreateOrderView = () => {
   const { ref, width, height } = useElementSize()
   const [valueSelect, setValueSelect] = useState<string | null>(null)
   const [itemsArray, setItemsArray] = useState([])

   const { itemsStore, suppliersStore, ordersStore } = useAppStore()
   const { items } = itemsStore.getters
   const { suppliers } = suppliersStore.getters

   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<IFormInputsForCreateOrderInterface>({
      defaultValues: {
         itemDetails: [],
         orderDate: new Date(),
         orderTaxRate: 0,
         orderDiscount: 0,
         status: "",
         note: "",
         supplierId: "",
      },
   })

   const { fields, append, remove } = useFieldArray({
      control,
      name: "itemDetails",
   })

   const onSubmit = (data: IFormInputsForCreateOrderInterface) => {
      const dataToSend: CreateOrderDto = {
         referenceNumber: "referenceNumber",
         supplierId: Number(data.supplierId),
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
         itemOrders: itemDetailsFormatted(data),
         orderDate: data.orderDate,
      }
      ordersStore.actions.addOrder(dataToSend)
      ordersStore.actions.disposeState()
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
         if (valueSelect.split("-").length === 13) {
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
            const itemUnitPriceIdFromSelect = valueSelect.split("-")[11]
            const itemPriceFromSelect = valueSelect.split("-")[12]
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
                     itemCost: itemCostFromSelect,
                     itemPrice: itemPriceFromSelect,
                     itemTaxRate: itemTaxRateFromSelect,
                     itemCode: itemCodeFromSelect,
                     quantity: 0,
                     receivedQuantity: 0,
                     discount: 0,
                     isBatch: itemIsBatchFromSelect === "true",
                     itemTaxMethod: itemTaxMethodFromSelect,
                     itemCostId: Number.parseInt(itemUnitCostIdFromSelect),
                     itemPriceId: Number.parseInt(itemUnitPriceIdFromSelect),
                  },
               ])
               append({
                  itemId: Number.parseInt(itemIdFromSelect),
                  itemBatchId: Number.parseInt(itemBatchIdFromSelect),
                  itemBatchNumber: itemBatchNumberFromSelect,
                  itemBatchDate: itemBatchDateFromSelect,
                  itemName: itemNameFromSelect,
                  itemCost: itemCostFromSelect,
                  itemPrice: itemPriceFromSelect,
                  itemTaxRate: itemTaxRateFromSelect,
                  itemCode: itemCodeFromSelect,
                  quantity: 0,
                  receivedQuantity: 0,
                  discount: 0,
                  isBatch: itemIsBatchFromSelect === "true",
                  itemTaxMethod: itemTaxMethodFromSelect,
                  itemCostId: Number.parseInt(itemUnitCostIdFromSelect),
                  itemPriceId: Number.parseInt(itemUnitPriceIdFromSelect),
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
            const itemUnitPriceIdFromSelect = valueSelect.split("-")[8]
            const itemPriceFromSelect = valueSelect.split("-")[9]
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
                     itemCost: itemCostFromSelect,
                     itemPrice: itemPriceFromSelect,
                     itemTaxRate: itemTaxRateFromSelect,
                     itemCode: itemCodeFromSelect,
                     quantity: 0,
                     receivedQuantity: 0,
                     discount: 0,
                     isBatch: itemIsBatchFromSelect === "true",
                     itemTaxMethod: itemTaxMethodFromSelect,
                     itemCostId: Number.parseInt(itemUnitCostIdFromSelect),
                     itemPriceId: Number.parseInt(itemUnitPriceIdFromSelect),
                  },
               ])
               append({
                  itemId: Number.parseInt(itemIdFromSelect),
                  itemName: itemNameFromSelect,
                  itemCost: itemCostFromSelect,
                  itemPrice: itemPriceFromSelect,
                  itemTaxRate: itemTaxRateFromSelect,
                  itemCode: itemCodeFromSelect,
                  quantity: 0,
                  receivedQuantity: 0,
                  discount: 0,
                  isBatch: itemIsBatchFromSelect === "true",
                  itemTaxMethod: itemTaxMethodFromSelect,
                  itemCostId: Number.parseInt(itemUnitCostIdFromSelect),
                  itemPriceId: Number.parseInt(itemUnitPriceIdFromSelect),
               })
            }
         }
      }
   }, [valueSelect])

   useEffect(() => {
      if (items.length === 0) {
         itemsStore.actions.loadItems()
      }
      if (suppliers.length === 0) {
         suppliersStore.actions.loadSuppliers()
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
               name="orderDate"
               control={control}
               rules={{ required: true }}
               render={({ field }) => (
                  <DatePickerInput
                     {...field}
                     miw={150}
                     label="Order Date"
                     withAsterisk
                     dropdownType="modal"
                     error={
                        errors.orderDate?.type === "required" &&
                        "Este campo es requerido"
                     }
                  />
               )}
            />
            <Controller
               name="supplierId"
               control={control}
               rules={{ required: true }}
               render={({ field }) => (
                  <Select
                     {...field}
                     miw={150}
                     withAsterisk
                     label="Proveedor"
                     searchable
                     error={
                        errors.supplierId?.type === "required" &&
                        "Este campo es requerido"
                     }
                     data={
                        suppliers.length === 0
                           ? ["No Suppliers"]
                           : suppliers.map((supplier) => {
                                return {
                                   label: supplier.name,
                                   value: supplier.supplierId.toString(),
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
                     miw={150}
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
                     label="Order Tax"
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
                     label="Order Discount"
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
                                 <NetcostOrderDetailComponent
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
                                 <SubTotalOrderComponent
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
                     <TotalOrderItemDetailsComponent control={control} />
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

export default CreateOrderView
