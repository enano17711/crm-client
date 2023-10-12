import React, { useEffect } from "react"
import { useAtom } from "jotai"
import { selectedTaxAtom } from "../../store/tax.atoms.ts"
import { useNavigate } from "react-router-dom"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useApiTaxTaxPostHook } from "../../api-gen/hooks/taxController"
import { CreateTaxDto } from "../../api-gen"
import CreateUpdateTopBarComponent from "../../components/CreateUpdateTopBar.component.tsx"
import {
   NumberInput,
   Space,
   Stack,
   Textarea,
   TextInput,
   Title,
} from "@mantine/core"

interface IFormInputs {
   name: string
   rate: number
   description: string
}

const CreateTaxView = () => {
   const [saveType, setSaveType] = React.useState<
      "create_new" | "create_close" | "create_clone"
   >("create_new")
   const [selectedTax, setSelectedTax] = useAtom(selectedTaxAtom)
   const navigate = useNavigate()

   const {
      handleSubmit,
      control,
      reset,
      formState: { errors },
   } = useForm<IFormInputs>({
      defaultValues: {
         name: "",
         rate: 0,
         description: "",
      },
   })

   const { mutate } = useApiTaxTaxPostHook({
      mutation: {
         onSuccess: (_, variables) => {
            setSelectedTax({})
            if (saveType === "create_new") {
               reset({
                  name: "",
                  rate: 0,
                  description: "",
               })
            } else if (saveType === "create_clone") {
               reset({
                  name: variables.name,
                  rate: variables.rate,
                  description: variables.description,
               })
            } else {
               reset({
                  name: "",
                  rate: 0,
                  description: "",
               })
               navigate("/taxes")
            }
         },
      },
   })

   const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
      mutate(data as CreateTaxDto)
   }

   useEffect(() => {
      if (selectedTax?.name !== null && selectedTax?.name !== undefined) {
         reset({
            name: selectedTax?.name,
            rate: selectedTax?.rate,
            description: selectedTax?.description,
         })
      }
   }, [])

   return (
      <>
         <CreateUpdateTopBarComponent
            backRoute={"/taxes"}
            reloadEnabled={false}
            formKey={"create-tax-form"}
            setSaveType={setSaveType}
         >
            <Title order={3}>Crear Impuesto</Title>
         </CreateUpdateTopBarComponent>
         <Space h="sm" />
         <form id="create-tax-form" onSubmit={handleSubmit(onSubmit)}>
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
                  name="rate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                     <NumberInput
                        {...field}
                        label="Valor"
                        precision={2}
                        min={0}
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
                           errors.rate?.type === "required" &&
                           "Este campo es requerido"
                        }
                     />
                  )}
               />
               <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                     <Textarea
                        {...field}
                        label="Descripcion"
                        placeholder="Milimetro"
                        autosize
                        minRows={6}
                        maxRows={10}
                     />
                  )}
               />
            </Stack>
         </form>
      </>
   )
}

export default CreateTaxView
