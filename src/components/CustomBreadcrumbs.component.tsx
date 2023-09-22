import { Breadcrumbs, Kbd } from "@mantine/core"
import { Link } from "react-router-dom"

type CustomBreadcrumbsProps = {
   routes: { path: string; title: string }[]
}

const CustomBreadcrumbsComponent = ({ routes }: CustomBreadcrumbsProps) => (
   <Breadcrumbs>
      {routes.map((route) => (
         <Link to={route.path} key={route.path}>
            <Kbd>{route.title}</Kbd>
         </Link>
      ))}
   </Breadcrumbs>
)

export default CustomBreadcrumbsComponent
