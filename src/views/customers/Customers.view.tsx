import CustomBreadcrumbsComponent from "../../components/CustomBreadcrumbs.component.tsx"
import React, { useEffect } from "react"
import { Button, Group, Space } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { ModalCreateCustomerComponent } from "./components/ModalCreateCustomer.component.tsx"
import { useAppStore } from "../../store"
import DialogDeleteCustomerComponent from "./components/DialogDeleteCustomer.component.tsx"
import { useElementSize } from "@mantine/hooks"
import { DataGridCustomerComponent } from "./components/DataGridCustomer.component.tsx"

const routes = [
   { path: "/", title: "Inicio" },
   { path: "/customers", title: "Clientes" },
]
const CustomersView = () => {
   const { customersStore } = useAppStore()
   const { customers } = customersStore.getters

   const { ref, width, height } = useElementSize()

   useEffect(() => {
      if (customers.length === 0) {
         customersStore.actions.loadCustomers()
      }
   }, [])

   return (
      <>
         <Group position="apart" ref={ref}>
            <CustomBreadcrumbsComponent routes={routes} />
            <Button
               leftIcon={<IconPlus size={20} />}
               onClick={() => customersStore.actions.prepareForCreate()}
            >
               Crear Cliente
            </Button>
         </Group>
         <Space h="sm" />
         <DataGridCustomerComponent dataSource={customers} />
         <ModalCreateCustomerComponent />
         <DialogDeleteCustomerComponent />
      </>
   )
}

export default CustomersView
