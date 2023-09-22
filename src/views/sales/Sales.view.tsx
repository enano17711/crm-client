import { Button, Group, Space } from "@mantine/core"
import CustomBreadcrumbsComponent from "../../components/CustomBreadcrumbs.component.tsx"
import { Link } from "react-router-dom"
import { IconPlus } from "@tabler/icons-react"
import DataGridSalesComponent from "./components/DataGridSales.component.tsx"

const routes = [
   { path: "/", title: "Inicio" },
   { path: "/sales", title: "Ventas" },
]

const SalesView = () => {
   return (
      <>
         <Group position="apart">
            <CustomBreadcrumbsComponent routes={routes} />
            <Link to="/create-sale">
               <Button leftIcon={<IconPlus size={20} />}>Crear Sale</Button>
            </Link>
         </Group>
         <Space h="sm" />
         <DataGridSalesComponent />
      </>
   )
}

export default SalesView
