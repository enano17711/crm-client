import React, { useEffect } from "react"
import { useAtom } from "jotai"
import { selectedItemAtom } from "../../store/item.atoms.ts"
import { useNavigate } from "react-router-dom"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { CreateItemDto } from "../../api-gen"
import CreateUpdateTopBarComponent from "../../components/CreateUpdateTopBar.component.tsx"
import {
   Group,
   MultiSelect,
   NumberInput,
   Select,
   Space,
   Stack,
   TextInput,
   Title,
} from "@mantine/core"
import { useApiItemItemPostHook } from "../../api-gen/hooks/itemController"
import { useApiUnitUnitsGetHook } from "../../api-gen/hooks/unitController"
import { useApiBrandBrandsGetHook } from "../../api-gen/hooks/brandController"
import { useApiTaxTaxsGetHook } from "../../api-gen/hooks/taxController"
import { useApiCategoryItemCategoryItemsGetHook } from "../../api-gen/hooks/categoryItemController"

interface IFormInputs {
   name: string
   code: string
   price: number
   cost: number
   isBatched: string
   taxCostMethod: string
   taxPriceMethod: string
   description: string
   categoryItems: Array<string>
   taxCostId: string
   taxPriceId: string
   brandId: string
   unitPriceId: string
   unitCostId: string
}

const CreateItemView = () => {
   const [saveType, setSaveType] = React.useState<
      "create_new" | "create_close" | "create_clone"
   >("create_new")
   const [selectedItem, setSelectedItem] = useAtom(selectedItemAtom)
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
         price: 0,
         cost: 0,
         isBatched: "",
         taxCostMethod: "",
         taxPriceMethod: "",
         description: "",
         categoryItems: [],
         taxCostId: "",
         taxPriceId: "",
         brandId: "",
         unitPriceId: "",
         unitCostId: "",
      },
   })

   const { data: unitQueryData, status: unitQueryStatus } =
      useApiUnitUnitsGetHook({
         ColumnName: "Name",
         ColumnValue: "",
         PageNumber: 1,
         PageSize: 1000,
         OrderBy: "Name",
         OrderDirection: "ASC",
      })

   const { data: brandQueryData, status: brandQueryStatus } =
      useApiBrandBrandsGetHook({
         ColumnName: "Name",
         ColumnValue: "",
         PageNumber: 1,
         PageSize: 1000,
         OrderBy: "Name",
         OrderDirection: "ASC",
      })

   const { data: taxQueryData, status: taxQueryStatus } = useApiTaxTaxsGetHook({
      ColumnName: "Name",
      ColumnValue: "",
      PageNumber: 1,
      PageSize: 1000,
      OrderBy: "Name",
      OrderDirection: "ASC",
   })

   const { data: categoryItemQueryData, status: categoryItemQueryStatus } =
      useApiCategoryItemCategoryItemsGetHook({
         ColumnName: "Name",
         ColumnValue: "",
         PageNumber: 1,
         PageSize: 1000,
         OrderBy: "Name",
         OrderDirection: "ASC",
      })

   const { mutate } = useApiItemItemPostHook({
      mutation: {
         onSuccess: (_, variables) => {
            setSelectedItem({})
            if (saveType === "create_new") {
               reset({
                  name: "",
                  code: "",
                  price: 0,
                  cost: 0,
                  isBatched: "",
                  taxCostMethod: "",
                  taxPriceMethod: "",
                  description: "",
                  categoryItems: [],
                  taxCostId: "",
                  taxPriceId: "",
                  brandId: "",
                  unitPriceId: "",
                  unitCostId: "",
               })
            } else if (saveType === "create_clone") {
               reset({
                  name: variables.name,
                  code: variables.code,
                  price: variables.price,
                  cost: variables.cost,
                  isBatched: variables.isBatched === true ? "true" : "false",
                  taxCostMethod: variables.taxCostMethod,
                  taxPriceMethod: variables.taxPriceMethod,
                  description: variables.description,
                  categoryItems: variables.categoryItems.map((item) =>
                     item.toString(),
                  ),
                  taxCostId: variables.taxCostId.toString(),
                  taxPriceId: variables.taxPriceId.toString(),
                  brandId: variables.brandId.toString(),
                  unitPriceId: variables.unitPriceId.toString(),
                  unitCostId: variables.unitCostId.toString(),
               })
            } else {
               reset({
                  name: "",
                  code: "",
                  price: 0,
                  cost: 0,
                  isBatched: "",
                  taxCostMethod: "",
                  taxPriceMethod: "",
                  description: "",
                  categoryItems: [],
                  taxCostId: "",
                  taxPriceId: "",
                  brandId: "",
                  unitPriceId: "",
                  unitCostId: "",
               })
               navigate("/items")
            }
         },
      },
   })

   const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
      const itemForCreate: CreateItemDto = {
         name: data.name,
         code: data.code,
         price: data.price,
         cost: data.cost,
         isBatched: data.isBatched === "true" ? true : false,
         taxCostMethod: data.taxCostMethod,
         taxPriceMethod: data.taxPriceMethod,
         description: data.description,
         categoryItems: data.categoryItems.map((item) => Number(item)),
         taxCostId: Number(data.taxCostId),
         taxPriceId: Number(data.taxPriceId),
         brandId: Number(data.brandId),
         unitPriceId: Number(data.unitPriceId),
         unitCostId: Number(data.unitCostId),
      }
      mutate(itemForCreate)
   }

   useEffect(() => {
      if (selectedItem?.name !== null && selectedItem?.name !== undefined) {
         reset({
            name: selectedItem?.name,
            code: selectedItem?.code,
            price: selectedItem?.price,
            cost: selectedItem?.cost,
            isBatched: selectedItem?.isBatched === true ? "true" : "false",
            taxCostMethod: selectedItem?.taxCostMethod,
            taxPriceMethod: selectedItem?.taxPriceMethod,
            description: selectedItem?.description,
            categoryItems: selectedItem?.categoryItems.map((item) =>
               item.categoryItemId.toString(),
            ),
            taxCostId: selectedItem?.taxCost.taxId.toString(),
            taxPriceId: selectedItem?.taxPrice.taxId.toString(),
            brandId: selectedItem?.brand.brandId.toString(),
            unitPriceId: selectedItem?.unitPrice.unitId.toString(),
            unitCostId: selectedItem?.unitCost.unitId.toString(),
         })
      }
   }, [])

   return (
      <>
         <CreateUpdateTopBarComponent
            backRoute={"/items"}
            reloadEnabled={false}
            formKey={"create-item-form"}
            setSaveType={setSaveType}
         >
            <Title order={3}>Crear Item</Title>
         </CreateUpdateTopBarComponent>
         <Space h="sm" />
         <form id="create-item-form" onSubmit={handleSubmit(onSubmit)}>
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
               {/*Codigo y Marca*/}
               <Group position="apart" grow>
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
                              "Este campo es requerido"
                           }
                        />
                     )}
                  />
                  <Controller
                     name="brandId"
                     control={control}
                     rules={{ required: true }}
                     render={({ field }) => (
                        <Select
                           {...field}
                           withAsterisk
                           label="Marca"
                           searchable
                           error={
                              errors.brandId?.type === "required" &&
                              "Este campo es requerido"
                           }
                           data={
                              brandQueryStatus === "loading"
                                 ? ["Cargando"]
                                 : brandQueryData?.data?.items?.map((brand) => {
                                      return {
                                         label: brand.name,
                                         value: brand.brandId.toString(),
                                      }
                                   })
                           }
                        />
                     )}
                  />
               </Group>
               {/*Unidad Precio y Unidad Costo*/}
               <Group position="apart" grow>
                  <Controller
                     name="unitPriceId"
                     control={control}
                     rules={{ required: true }}
                     render={({ field }) => (
                        <Select
                           {...field}
                           withAsterisk
                           label="Unidad Venta"
                           searchable
                           error={
                              errors.unitPriceId?.type === "required" &&
                              "Este campo es requerido"
                           }
                           data={
                              unitQueryStatus === "loading"
                                 ? ["Cargando"]
                                 : unitQueryData?.data?.items?.map((unit) => {
                                      return {
                                         label: `${unit.name} | ${unit.code}`,
                                         value: unit.unitId.toString(),
                                      }
                                   })
                           }
                        />
                     )}
                  />
                  <Controller
                     name="unitCostId"
                     control={control}
                     rules={{ required: true }}
                     render={({ field }) => (
                        <Select
                           {...field}
                           withAsterisk
                           label="Unidad Compra"
                           searchable
                           error={
                              errors.unitCostId?.type === "required" &&
                              "Este campo es requerido"
                           }
                           data={
                              unitQueryStatus === "loading"
                                 ? ["Cargando"]
                                 : unitQueryData?.data?.items?.map((unit) => {
                                      return {
                                         label: `${unit.name} | ${unit.code}`,
                                         value: unit.unitId.toString(),
                                      }
                                   })
                           }
                        />
                     )}
                  />
               </Group>
               {/*Precio y Costo*/}
               <Group position="apart" grow>
                  <Controller
                     name="price"
                     control={control}
                     rules={{ required: true }}
                     render={({ field }) => (
                        <NumberInput
                           {...field}
                           label="Precio"
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
                              errors.price?.type === "required" &&
                              "Este campo es requerido"
                           }
                        />
                     )}
                  />
                  <Controller
                     name="cost"
                     control={control}
                     rules={{ required: true }}
                     render={({ field }) => (
                        <NumberInput
                           {...field}
                           label="Costo"
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
                              errors.cost?.type === "required" &&
                              "Este campo es requerido"
                           }
                        />
                     )}
                  />
               </Group>
               {/*ImpuestoId y tipo impuesto*/}
               <Group position="apart" grow>
                  <Controller
                     name="taxCostId"
                     control={control}
                     rules={{ required: true }}
                     render={({ field }) => (
                        <Select
                           {...field}
                           withAsterisk
                           label="Impuesto Compra"
                           searchable
                           error={
                              errors.taxCostId?.type === "required" &&
                              "Este campo es requerido"
                           }
                           data={
                              taxQueryStatus === "loading"
                                 ? ["Cargando"]
                                 : taxQueryData?.data?.items?.map((tax) => {
                                      return {
                                         label: `${tax.name} | ${tax.rate}%`,
                                         value: tax.taxId.toString(),
                                      }
                                   })
                           }
                        />
                     )}
                  />
                  <Controller
                     name="taxCostMethod"
                     control={control}
                     rules={{ required: true }}
                     render={({ field }) => (
                        <Select
                           {...field}
                           withAsterisk
                           label="Metodo Impuesto Compra"
                           searchable
                           error={
                              errors.taxCostMethod?.type === "required" &&
                              "Este campo es requerido"
                           }
                           data={["Exclusivo", "Inclusivo"]}
                        />
                     )}
                  />
               </Group>
               <Group position="apart" grow>
                  <Controller
                     name="taxPriceId"
                     control={control}
                     rules={{ required: true }}
                     render={({ field }) => (
                        <Select
                           {...field}
                           withAsterisk
                           label="Impuesto Venta"
                           searchable
                           error={
                              errors.taxPriceId?.type === "required" &&
                              "Este campo es requerido"
                           }
                           data={
                              taxQueryStatus === "loading"
                                 ? ["Cargando"]
                                 : taxQueryData?.data?.items?.map((tax) => {
                                      return {
                                         label: `${tax.name} | ${tax.rate}%`,
                                         value: tax.taxId.toString(),
                                      }
                                   })
                           }
                        />
                     )}
                  />
                  <Controller
                     name="taxPriceMethod"
                     control={control}
                     rules={{ required: true }}
                     render={({ field }) => (
                        <Select
                           {...field}
                           withAsterisk
                           label="Metodo Impuesto Venta"
                           searchable
                           error={
                              errors.taxPriceMethod?.type === "required" &&
                              "Este campo es requerido"
                           }
                           data={["Exclusivo", "Inclusivo"]}
                        />
                     )}
                  />
               </Group>
               <Controller
                  name="categoryItems"
                  control={control}
                  render={({ field }) => (
                     <MultiSelect
                        {...field}
                        label="Categorias de Items"
                        data={
                           categoryItemQueryStatus === "loading"
                              ? ["Cargando"]
                              : categoryItemQueryData?.data?.items?.map(
                                   (cat) => {
                                      return {
                                         label: cat.name,
                                         value: cat.categoryItemId.toString(),
                                      }
                                   },
                                )
                        }
                        withAsterisk
                        error={
                           errors.categoryItems?.type === "required" &&
                           "Este campo es requerido"
                        }
                     />
                  )}
               />
               <Controller
                  name="isBatched"
                  control={control}
                  render={({ field }) => (
                     <Select
                        {...field}
                        withAsterisk
                        label="Tiene lote y expiracion"
                        searchable
                        error={
                           errors.isBatched?.type === "required" &&
                           "Este campo es requerido"
                        }
                        data={[
                           { value: "true", label: "Si" },
                           { value: "false", label: "No" },
                        ]}
                     />
                  )}
               />
               <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                     <TextInput
                        {...field}
                        label="Descripcion"
                        placeholder="Milimetro"
                     />
                  )}
               />
            </Stack>
         </form>
      </>
   )
}

export default CreateItemView
