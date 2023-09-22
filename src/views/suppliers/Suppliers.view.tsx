import CustomBreadcrumbsComponent from "../../components/CustomBreadcrumbs.component.tsx"
import React, { useEffect } from "react"
import { Button, Group, Space } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { ModalCreateSupplierComponent } from "./components/ModalCreateSupplier.component.tsx"
import { useAppStore } from "../../store"
import DialogDeleteSupplierComponent from "./components/DialogDeleteSupplier.component.tsx"
import { useElementSize } from "@mantine/hooks"
import { DataGridSupplierComponent } from "./components/DataGridSupplier.component.tsx"

const routes = [
   { path: "/", title: "Inicio" },
   { path: "/suppliers", title: "Proveedores" },
]
const SuppliersView = () => {
   const { suppliersStore } = useAppStore()
   const { suppliers } = suppliersStore.getters

   const { ref, width, height } = useElementSize()

   useEffect(() => {
      if (suppliers.length === 0) {
         suppliersStore.actions.loadSuppliers()
      }
   }, [])

   return (
      <>
         <Group position="apart" ref={ref}>
            <CustomBreadcrumbsComponent routes={routes} />
            <Button
               leftIcon={<IconPlus size={20} />}
               onClick={() => suppliersStore.actions.prepareForCreate()}
            >
               Crear Proveedor
            </Button>
         </Group>
         <Space h="sm" />
         <DataGridSupplierComponent dataSource={suppliers} />
         <ModalCreateSupplierComponent />
         <DialogDeleteSupplierComponent />
      </>
   )
}

export default SuppliersView
