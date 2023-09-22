import { NavLink as NavRouterLink } from "react-router-dom"
import { NavLink } from "@mantine/core"

type NavItemMenuLayoutProps = {
   rute: string
   label: string
}
const NavItemMenuLayout = ({ rute, label }: NavItemMenuLayoutProps) => {
   return (
      <NavRouterLink to={`/${rute}`} style={{ textDecoration: "none" }}>
         {({ isActive }) => (
            <NavLink
               active={isActive}
               label={label}
               component="a"
               variant="filled"
               color="violet"
               sx={(theme) => ({
                  borderRadius: theme.radius.md,
               })}
            />
         )}
      </NavRouterLink>
   )
}

export default NavItemMenuLayout
