import {
   Button,
   Group,
   Modal,
   MultiSelect,
   NumberInput,
   Select,
   Stack,
   TextInput,
} from "@mantine/core"
import { useEffect, useMemo } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useAppStore } from "../../../store"
import {
   BrandApi,
   BrandDto,
   CreateBrandDto,
   CreateItemDto,
   ItemApi,
   ItemSimpleDto,
   UpdateBrandDto,
   UpdateItemDto,
} from "../../../api-services"
import { DispatchFunc } from "ka-table/types"
import { feature, getAPI } from "../../../axios-utils.ts"
import { notifications } from "@mantine/notifications"
import { loadData } from "ka-table/actionCreators"

interface IFormInputs {
   name: string
   code: string
   price: number
   cost: number
   quantity: number
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
   baseUnitId: string
}

interface ModalCreateItemComponentProps {
   openModal: any
   setOpenModal: any
   itemData?: ItemSimpleDto
   title: string
   type: "create" | "update"
   dispatch: DispatchFunc
}

export const ModalCreateItemComponent = ({
   itemData,
   setOpenModal,
   openModal,
   title,
   type,
   dispatch,
}: ModalCreateItemComponentProps) => {
   const {
      baseUnitsStore,
      unitsStore,
      categoryItemsStore,
      brandsStore,
      taxsStore,
   } = useAppStore()
   const { baseUnits } = baseUnitsStore.getters
   const { units } = unitsStore.getters
   const { categoryItems } = categoryItemsStore.getters
   const { brands } = brandsStore.getters
   const { taxs } = taxsStore.getters

   const {
      watch,
      setValue,
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
         quantity: 0,
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
         baseUnitId: "",
      },
   })
   const watchBaseUnitId = watch("baseUnitId")

   const unitArrayFromBaseUnitId = useMemo(() => {
      setValue("unitPriceId", "")
      setValue("unitCostId", "")
      const baseUnitId = Number(watchBaseUnitId)
      return units.filter((unit) => unit.baseUnit.baseUnitId === baseUnitId)
   }, [units, watchBaseUnitId])

   const onModalClose = () => {
      setOpenModal(false)
      reset({
         name: "",
         code: "",
         price: 0,
         cost: 0,
         quantity: 0,
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
         baseUnitId: "",
      })
   }
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
      if (type === "create") {
         const [err, res] = await feature(
            getAPI(ItemApi).apiItemItemPost(itemForCreate),
         )
         if (err) {
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            dispatch(loadData())
            notifications.show({
               title: "Operación Exitosa",
               message: "Marca creada con éxito",
               color: "teal",
            })
         }
      } else if (type === "update") {
         const [err, res] = await feature(
            getAPI(ItemApi).apiItemItemIdPut(itemData?.itemId, itemForCreate),
         )
         if (err) {
            notifications.show({
               title: "Operación Fallida",
               message: err.message,
               color: "red",
            })
         } else {
            dispatch(loadData())
            notifications.show({
               title: "Operación Exitosa",
               message: "Marca actualizada con exito",
               color: "teal",
            })
         }
      }
      onModalClose()
   }

   useEffect(() => {
      if (baseUnits.length <= 0) {
         baseUnitsStore.actions.loadBaseUnits()
      }
      if (brands.length <= 0) {
         brandsStore.actions.loadBrands()
      }
      if (units.length <= 0) {
         unitsStore.actions.loadUnits()
      }
      if (categoryItems.length <= 0) {
         categoryItemsStore.actions.loadCategoryItems()
      }
      if (taxs.length <= 0) {
         taxsStore.actions.loadTaxs()
      }
   }, [])

   useEffect(() => {
      if (itemData?.name) {
         reset({
            name: itemData?.name,
            code: itemData?.code,
            price: itemData?.price,
            cost: itemData?.cost,
            quantity: itemData?.quantity,
            isBatched: itemData?.isBatched === true ? "true" : "false",
            taxCostMethod: itemData?.taxCostMethod,
            taxPriceMethod: itemData?.taxPriceMethod,
            description: itemData?.description,
            categoryItems: itemData?.categoryItems.map((cat) =>
               cat.categoryItemId.toString(),
            ),
            taxCostId: itemData?.taxCost?.taxId.toString(),
            brandId: itemData?.brand?.brandId.toString(),
            unitPriceId: itemData?.unitPrice?.unitId.toString(),
            unitCostId: itemData?.unitCost?.unitId.toString(),
         })
      }
   }, [itemData])

   return (
      <>
         <Modal
            opened={openModal}
            title={title}
            centered
            onClose={onModalClose}
            closeOnClickOutside={false}
         >
            <form onSubmit={handleSubmit(onSubmit)}>
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
                                 brands.length === 0
                                    ? ["Cargando"]
                                    : brands.map((brand) => {
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
                  <Controller
                     name="baseUnitId"
                     control={control}
                     rules={{ required: true }}
                     render={({ field }) => (
                        <Select
                           {...field}
                           withAsterisk
                           label="Unidad Base"
                           searchable
                           error={
                              errors.baseUnitId?.type === "required" &&
                              "Este campo es requerido"
                           }
                           data={
                              baseUnits.length === 0
                                 ? ["Cargando"]
                                 : baseUnits.map((base) => {
                                      return {
                                         label: base.name,
                                         value: base.baseUnitId.toString(),
                                      }
                                   })
                           }
                        />
                     )}
                  />
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
                                 units.length === 0
                                    ? ["No data"]
                                    : unitArrayFromBaseUnitId.map((unit) => {
                                         return {
                                            label: unit.name,
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
                                 units.length === 0
                                    ? ["No data"]
                                    : unitArrayFromBaseUnitId.map((unit) => {
                                         return {
                                            label: unit.name,
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
                                 taxs.length === 0
                                    ? ["Cargando"]
                                    : taxs.map((tax) => {
                                         return {
                                            label: `${tax.name} = ${tax.rate}%`,
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
                                 taxs.length === 0
                                    ? ["Cargando"]
                                    : taxs.map((tax) => {
                                         return {
                                            label: `${tax.name} = ${tax.rate}%`,
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
                              categoryItems.length == 0
                                 ? ["Cargando"]
                                 : categoryItems.map((cat) => {
                                      return {
                                         label: cat.name,
                                         value: cat.categoryItemId.toString(),
                                      }
                                   })
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
                  <Group position="right">
                     <Button color="red" onClick={onModalClose}>
                        Cancelar
                     </Button>
                     <Button type="submit">Aceptar</Button>
                  </Group>
               </Stack>
            </form>
         </Modal>
      </>
   )
}
