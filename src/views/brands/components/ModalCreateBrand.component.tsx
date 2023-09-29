import { Button, Group, Modal, Stack, TextInput } from "@mantine/core"
import {
   BrandApi,
   BrandDto,
   BrandSimpleDto,
   CreateBrandDto,
   UpdateBrandDto,
} from "../../../api-services"
import { useEffect } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { feature, getAPI } from "../../../axios-utils.ts"
import { notifications } from "@mantine/notifications"
import { DispatchFunc } from "ka-table/types"
import { loadData } from "ka-table/actionCreators"

interface IFormInputs {
   name: string
   description: string
}

interface ModalCreateBrandComponentProps {
   openModal: any
   setOpenModal: any
   brandData?: BrandSimpleDto
   title: string
   type: "create" | "update"
   dispatch: DispatchFunc
}

export const ModalCreateBrandComponent = ({
   openModal,
   setOpenModal,
   brandData,
   title,
   type,
   dispatch,
}: ModalCreateBrandComponentProps) => {
   const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
   } = useForm<IFormInputs>({
      defaultValues: {
         name: "",
         description: "",
      },
   })
   const onModalClose = () => {
      setOpenModal(false)
      reset({
         name: "",
         description: "",
      })
   }
   const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
      if (type === "create") {
         const [err, res] = await feature(
            getAPI(BrandApi).apiBrandBrandPost(data as CreateBrandDto),
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
            getAPI(BrandApi).apiBrandBrandIdPut(
               brandData?.brandId,
               data as UpdateBrandDto,
            ),
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
      if (brandData?.name) {
         reset({
            name: brandData?.name,
            description: brandData?.description,
         })
      }
   }, [brandData])

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
