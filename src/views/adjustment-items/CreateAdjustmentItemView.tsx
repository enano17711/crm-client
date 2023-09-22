import React, { useEffect, useState } from "react"
import {
   Button,
   Group,
   NumberInput,
   Select,
   Space,
   TextInput,
   Textarea,
   Table,
   SegmentedControl,
   Center,
   Box,
} from "@mantine/core"
import CustomBreadcrumbsComponent from "../../components/CustomBreadcrumbs.component.tsx"
import { useAppStore } from "../../store"
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form"
import { CreateAdjustmentDto } from "../../api-services"
import { useNavigate } from "react-router-dom"
import { IconAssembly, IconHourglassLow } from "@tabler/icons-react"
import CreateAdjustmentNormalComponent from "./components/CreateAdjustmentNormal.component.tsx"
import CreateAdjustmentBatchedComponent from "./components/CreateAdjustmentBatched.component.tsx"

const routes = [
   { path: "/", title: "Inicio" },
   { path: "/adjustments", title: "Ajustes" },
   { path: "/create-adjustment", title: "Crear Ajuste" },
]

const CreateAdjustmentItemView = () => {
   const [adjustType, setAdjustType] = useState("normal")

   return (
      <>
         <Space h="sm" />
         <Group position="apart">
            <CustomBreadcrumbsComponent routes={routes} />
            <SegmentedControl
               value={adjustType}
               onChange={setAdjustType}
               data={[
                  {
                     value: "normal",
                     label: (
                        <Center>
                           <IconAssembly size="1rem" />
                           <Box ml={10}>Items</Box>
                        </Center>
                     ),
                  },
                  {
                     value: "batched",
                     label: (
                        <Center>
                           <IconHourglassLow size="1rem" />
                           <Box ml={10}>Items Batched</Box>
                        </Center>
                     ),
                  },
               ]}
            />
         </Group>
         <Space h="md" />
         {adjustType === "normal" ? (
            <CreateAdjustmentNormalComponent />
         ) : (
            <CreateAdjustmentBatchedComponent />
         )}
      </>
   )
}

export default CreateAdjustmentItemView
