import { Button, Group, Space } from "@mantine/core"
import CustomBreadcrumbsComponent from "../../components/CustomBreadcrumbs.component.tsx"
import { Link } from "react-router-dom"
import { IconPlus } from "@tabler/icons-react"
import DataGridOrdersComponent from "./components/DataGridOrders.component.tsx"

const routes = [
   { path: "/", title: "Inicio" },
   { path: "/orders", title: "Compras" },
]

const OrdersView = () => {
   return (
      <>
         <Group position="apart">
            <CustomBreadcrumbsComponent routes={routes} />
            <Link to="/create-order">
               <Button leftIcon={<IconPlus size={20} />}>Crear Order</Button>
            </Link>
         </Group>
         <Space h="sm" />
         <DataGridOrdersComponent />
      </>
   )
}

export default OrdersView
