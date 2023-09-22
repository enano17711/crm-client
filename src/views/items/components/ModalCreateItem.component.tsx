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
import { useEffect } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useAppStore } from "../../../store"
import { CreateItemDto, UpdateItemDto } from "../../../api-services"

interface IFormInputs {
   name: string
   code: string
   price: number
   cost: number
   quantity: number
   isBatched: string
   taxMethod: string
   description: string
   categoryItems: Array<string>
   taxId: string
   brandId: string
   unitPriceId: string
   unitCostId: string
}

export const ModalCreateItemComponent = () => {
   const {
      itemsStore,
      baseUnitsStore,
      unitsStore,
      categoryItemsStore,
      brandsStore,
      taxsStore,
   } = useAppStore()
   const { modalType, openUpdateModal, singleModel } = itemsStore.getters
   const { baseUnits } = baseUnitsStore.getters
   const { units } = unitsStore.getters
   const { categoryItems } = categoryItemsStore.getters
   const { brands } = brandsStore.getters
   const { taxs } = taxsStore.getters

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
         quantity: 0,
         isBatched: "",
         taxMethod: "",
         description: "",
         categoryItems: [],
         taxId: "",
         brandId: "",
         unitPriceId: "",
         unitCostId: "",
      },
   })
   const onModalClose = () => {
      itemsStore.actions.disposeState()
      reset({
         name: "",
         code: "",
         price: 0,
         cost: 0,
         quantity: 0,
         isBatched: "",
         taxMethod: "",
         description: "",
         categoryItems: [],
         taxId: "",
         brandId: "",
         unitPriceId: "",
         unitCostId: "",
      })
   }
   const onSubmit: SubmitHandler<IFormInputs> = (data) => {
      const itemForCreate: CreateItemDto = {
         name: data.name,
         code: data.code,
         price: data.price,
         cost: data.cost,
         quantity: data.quantity,
         isBatched: data.isBatched === "true" ? true : false,
         taxMethod: data.taxMethod,
         description: data.description,
         categoryItems: data.categoryItems.map((item) => Number(item)),
         taxId: Number(data.taxId),
         brandId: Number(data.brandId),
         unitPriceId: Number(data.unitPriceId),
         unitCostId: Number(data.unitCostId),
      }
      if (modalType === "create") {
         itemsStore.actions.addItem(itemForCreate)
      } else {
         itemsStore.actions.updateItem(
            singleModel.itemId,
            itemForCreate as UpdateItemDto,
         )
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
      if (singleModel?.name) {
         reset({
            name: singleModel?.name,
            code: singleModel?.code,
            price: singleModel?.price,
            cost: singleModel?.cost,
            quantity: singleModel?.quantity,
            isBatched: singleModel?.isBatched === true ? "true" : "false",
            taxMethod: singleModel?.taxMethod,
            description: singleModel?.description,
            categoryItems: singleModel?.categoryItems.map((cat) =>
               cat.categoryItemId.toString(),
            ),
            taxId: singleModel?.tax?.taxId.toString(),
            brandId: singleModel?.brand?.brandId.toString(),
            unitPriceId: singleModel?.unitPrice?.unitId.toString(),
            unitCostId: singleModel?.unitCost?.unitId.toString(),
         })
      }
   }, [singleModel])

   return (
      <>
         <Modal
            opened={openUpdateModal}
            title={modalType === "create" ? "Crear Item" : "Editar Item"}
            centered
            onClose={onModalClose}
            closeOnClickOutside={false}
         >
            <form onSubmit={handleSubmit(onSubmit)}>
               <Stack spacing="sm">
                  {/*Nombre*/}
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
                                    ? ["Cargando"]
                                    : units.map((unit) => {
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
                                    ? ["Cargando"]
                                    : units.map((unit) => {
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
                        name="taxId"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                           <Select
                              {...field}
                              withAsterisk
                              label="Impuesto"
                              searchable
                              error={
                                 errors.taxId?.type === "required" &&
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
                        name="taxMethod"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                           <Select
                              {...field}
                              withAsterisk
                              label="Metodo Impuesto"
                              searchable
                              error={
                                 errors.taxMethod?.type === "required" &&
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
                              errors.taxId?.type === "required" &&
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
