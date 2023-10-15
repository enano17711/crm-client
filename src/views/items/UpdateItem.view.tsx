import React, { useEffect, useState } from "react"
import { useSetAtom } from "jotai"
import { useNavigate, useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import {
   Box,
   Group,
   LoadingOverlay,
   MultiSelect,
   NumberInput,
   Select,
   Space,
   Stack,
   TextInput,
   Title,
} from "@mantine/core"
import CreateUpdateTopBarComponent from "../../components/CreateUpdateTopBar.component.tsx"
import { selectedItemAtom } from "../../store/item.atoms.ts"
import {
   useApiItemItemByIdIdGetHook,
   useApiItemItemIdPutHook,
} from "../../api-gen/hooks/itemController"
import { useApiUnitUnitsGetHook } from "../../api-gen/hooks/unitController"
import { useApiBrandBrandsGetHook } from "../../api-gen/hooks/brandController"
import { useApiTaxTaxsGetHook } from "../../api-gen/hooks/taxController"
import { useApiCategoryItemCategoryItemsGetHook } from "../../api-gen/hooks/categoryItemController"
import { UpdateItemDto } from "../../api-gen"

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

const UpdateItemView = () => {
   const setSelectedItem = useSetAtom(selectedItemAtom)
   const [saveType, setSaveType] = useState<
      "create_new" | "create_close" | "create_clone"
   >("create_new")
   const navigate = useNavigate()
   const params = useParams()

   const queryClient = useQueryClient()

   const {
      data: itemData,
      status: itemStatus,
      isFetching,
   } = useApiItemItemByIdIdGetHook(Number(params.itemId))

   const refreshData = () => {
      queryClient.invalidateQueries([`/api/item/item-by-id/${params.itemId}`])
      reset({
         name: itemData?.data?.name,
         code: itemData?.data?.code,
         price: itemData?.data.price,
         cost: itemData?.data?.cost,
         isBatched: itemData?.data?.isBatched.toString(),
         taxCostMethod: itemData?.data?.taxCostMethod,
         taxPriceMethod: itemData?.data?.taxPriceMethod,
         description: itemData?.data?.description,
         categoryItems: itemData?.data?.categoryItems.map((item) =>
            item.categoryItemId.toString(),
         ),
         taxCostId: itemData?.data?.taxCost?.taxId.toString(),
         taxPriceId: itemData?.data?.taxPrice?.taxId.toString(),
         brandId: itemData?.data?.brand?.brandId.toString(),
         unitPriceId: itemData?.data?.unitPrice?.unitId.toString(),
         unitCostId: itemData?.data?.unitCost?.unitId.toString(),
      })
   }

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

   const { mutate: itemMutate } = useApiItemItemIdPutHook(
      Number(params.itemId),
      {
         mutation: {
            onSuccess: async (_, variables) => {
               if (saveType === "create_new") {
                  setSelectedItem({})
                  navigate("/items/create")
               } else if (saveType === "create_clone") {
                  setSelectedItem((prev) => {
                     return {
                        name: variables.name,
                        code: variables.code,
                        price: variables.price,
                        cost: variables.cost,
                        isBatched: variables.isBatched,
                        itemId: Number(params.itemId),
                        description: variables.description,
                        taxCostMethod: variables.taxCostMethod,
                        taxPriceMethod: variables.taxPriceMethod,
                        quantity: itemData.data.quantity,
                        categoryItems: categoryItemQueryData.data.items.filter(
                           (catItem) =>
                              variables.categoryItems.includes(
                                 catItem.categoryItemId,
                              ),
                        ),
                        brand: brandQueryData.data.items.find(
                           (brand) => brand.brandId === variables.brandId,
                        ),
                        unitPrice: unitQueryData.data.items.find(
                           (unit) => unit.unitId === variables.unitPriceId,
                        ),
                        unitCost: unitQueryData.data.items.find(
                           (unit) => unit.unitId === variables.unitCostId,
                        ),
                        taxCost: taxQueryData.data.items.find(
                           (tax) => tax.taxId === variables.taxCostId,
                        ),
                        taxPrice: taxQueryData.data.items.find(
                           (tax) => tax.taxId === variables.taxPriceId,
                        ),
                     }
                  })
                  navigate(`/items/create`)
               } else {
                  setSelectedItem({})
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

   const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
      const itemForUpdate: UpdateItemDto = {
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
      itemMutate(itemForUpdate)
   }

   useEffect(() => {
      if (!isFetching) {
         reset({
            name: itemData?.data?.name,
            code: itemData?.data?.code,
            price: itemData?.data?.price,
            cost: itemData?.data?.cost,
            isBatched: itemData?.data?.isBatched ? "true" : "false",
            taxCostMethod: itemData?.data?.taxCostMethod,
            taxPriceMethod: itemData?.data?.taxPriceMethod,
            description: itemData?.data?.description,
            categoryItems: itemData?.data?.categoryItems.map((item) =>
               item.categoryItemId.toString(),
            ),
            taxCostId: itemData?.data?.taxCost?.taxId.toString(),
            taxPriceId: itemData?.data?.taxPrice?.taxId.toString(),
            brandId: itemData?.data?.brand.brandId.toString(),
            unitPriceId: itemData?.data?.unitPrice?.unitId.toString(),
            unitCostId: itemData?.data?.unitCost?.unitId.toString(),
         })
      }
   }, [itemStatus])

   return (
      <Box pos="relative">
         {itemStatus === "loading" && (
            <LoadingOverlay visible={true} overlayBlur={2} />
         )}
         <CreateUpdateTopBarComponent
            backRoute={"/items"}
            reloadEnabled={true}
            formKey={"update-item-form"}
            setSaveType={setSaveType}
            refreshMethod={refreshData}
         >
            <Title order={4}>Editar: {itemData?.data?.name}</Title>
         </CreateUpdateTopBarComponent>
         <Space h="sm" />
         <form id="update-item-form" onSubmit={handleSubmit(onSubmit)}>
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
      </Box>
   )
}

export default UpdateItemView
