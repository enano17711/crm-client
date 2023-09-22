import CustomBreadcrumbsComponent from "../../components/CustomBreadcrumbs.component.tsx"
import React, { useEffect } from "react"
import { Button, Group, Space } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { ModalCreateTaxComponent } from "./components/ModalCreateTax.component.tsx"
import { useAppStore } from "../../store"
import DialogDeleteTaxComponent from "./components/DialogDeleteTax.component.tsx"
import { DataGridTaxComponent } from "./components/DataGridTax.component.tsx"

const routes = [
   { path: "/", title: "Inicio" },
   { path: "/taxs", title: "Impuestos" },
]
const TaxsView = () => {
   const { taxsStore } = useAppStore()
   const { taxs } = taxsStore.getters

   useEffect(() => {
      if (taxs.length === 0) {
         taxsStore.actions.loadTaxs()
      }
   }, [])

   return (
      <>
         <Group position="apart">
            <CustomBreadcrumbsComponent routes={routes} />
            <Button
               leftIcon={<IconPlus size={20} />}
               onClick={() => taxsStore.actions.prepareForCreate()}
            >
               Crear Impuesto
            </Button>
         </Group>
         <Space h="sm" />
         <DataGridTaxComponent dataSource={taxs} />
         <ModalCreateTaxComponent />
         <DialogDeleteTaxComponent />
      </>
   )
}

export default TaxsView
