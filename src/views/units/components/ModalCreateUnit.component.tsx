import {
   Button,
   Group,
   Modal,
   NumberInput,
   Select,
   Stack,
   TextInput,
} from "@mantine/core"
import { CreateUnitDto, UpdateUnitDto } from "../../../api-services"
import { useEffect } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useAppStore } from "../../../store"

interface IFormInputs {
   name: string
   code: string
   operation: string
   value: number
   baseUnitId: string
   description: string
}

export const ModalCreateUnitComponent = () => {
   const { unitsStore, baseUnitsStore } = useAppStore()
   const { modalType, openUpdateModal, singleModel } = unitsStore.getters
   const { baseUnits } = baseUnitsStore.getters

   const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
   } = useForm<IFormInputs>({
      defaultValues: {
         name: "",
         code: "",
         operation: "",
         value: 0,
         baseUnitId: "",
         description: "",
      },
   })
   const onModalClose = () => {
      unitsStore.actions.disposeState()
      reset({
         name: "",
         code: "",
         operation: "",
         value: 0,
         baseUnitId: "",
         description: "",
      })
   }
   const onSubmit: SubmitHandler<IFormInputs> = (data) => {
      const dataForManipulation: CreateUnitDto = {
         name: data.name,
         code: data.code,
         operation: data.operation,
         value: data.value,
         baseUnitId: Number(data.baseUnitId),
         description: data.description,
      }
      if (modalType === "create") {
         unitsStore.actions.addUnit(dataForManipulation)
      } else {
         unitsStore.actions.updateUnit(
            singleModel.unitId,
            dataForManipulation as UpdateUnitDto,
         )
      }
      onModalClose()
   }

   useEffect(() => {
      if (baseUnits.length <= 0) {
         baseUnitsStore.actions.loadBaseUnits()
      }
   }, [])

   useEffect(() => {
      if (singleModel?.name) {
         reset({
            name: singleModel?.name,
            code: singleModel?.code,
            operation: singleModel?.operation,
            value: singleModel?.value,
            baseUnitId: singleModel?.baseUnit.baseUnitId.toString(),
            description: singleModel?.description,
         })
      }
   }, [singleModel])

   return (
      <>
         <Modal
            opened={openUpdateModal}
            title={modalType === "create" ? "Crear Unidad" : "Editar Unidad"}
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
                           placeholder="Milimetro"
                           withAsterisk
                           error={
                              errors.name?.type === "required" &&
                              "Este campo es requerido"
                           }
                        />
                     )}
                  />
                  <Controller
                     name="code"
                     control={control}
                     rules={{ required: true }}
                     render={({ field }) => (
                        <TextInput
                           {...field}
                           label="Codigo"
                           placeholder="Milimetro"
                           withAsterisk
                           error={
                              errors.code?.type === "required" &&
                              "Este campo es requerido"
                           }
                        />
                     )}
                  />
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
                                 : baseUnits.map((baseUnit) => {
                                      return {
                                         label: `${baseUnit.name} - ${baseUnit.code}`,
                                         value: baseUnit.baseUnitId.toString(),
                                      }
                                   })
                           }
                        />
                     )}
                  />
                  <Controller
                     name="operation"
                     control={control}
                     rules={{ required: true }}
                     render={({ field }) => (
                        <Select
                           data={["*", "/", "+", "-"]}
                           {...field}
                           withAsterisk
                           label="Operacion"
                        />
                     )}
                  />
                  <Controller
                     name="value"
                     control={control}
                     rules={{ required: true }}
                     render={({ field }) => (
                        <NumberInput
                           {...field}
                           label="Valor"
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
                              errors.value?.type === "required" &&
                              "Este campo es requerido"
                           }
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
