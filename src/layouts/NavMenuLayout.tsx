import { IconArrowsMoveHorizontal, IconFingerprint } from "@tabler/icons-react"
import { NavLink } from "@mantine/core"
import { useLocation } from "react-router-dom"
import NavItemMenuLayout from "./NavItemMenuLayout.tsx"
import { Can } from "../access-control.ts"

const NavMenuLayout = () => {
   const location = useLocation()

   return (
      <>
         <NavItemMenuLayout label={"Home"} rute={""} />
         <NavLink
            active={
               location.pathname === "/units" ||
               location.pathname === "/brands" ||
               location.pathname === "/category-items" ||
               location.pathname === "/items" ||
               location.pathname === "/base-units" ||
               location.pathname === "/taxs" ||
               location.pathname === "/create-adjustment" ||
               location.pathname === "/adjustments"
            }
            label="Inventario"
            icon={<IconFingerprint size={16} stroke={1.5} />}
            childrenOffset={28}
            color="violet"
            variant="light"
            sx={(theme) => ({
               borderRadius: theme.radius.md,
            })}
         >
            <Can I="ViewItem" a="user">
               <NavItemMenuLayout label={"Items"} rute={"items"} />
            </Can>
            <Can I="ViewUnit" a="user">
               <NavItemMenuLayout label={"Unidades"} rute={"units"} />
            </Can>
            <Can I="ViewBaseUnit" a="user">
               <NavItemMenuLayout label={"Unidades Base"} rute={"base-units"} />
            </Can>
            <Can I="ViewBrand" a="user">
               <NavItemMenuLayout label={"Marcas"} rute={"brands"} />
            </Can>
            <Can I="ViewCategoryItem" a="user">
               <NavItemMenuLayout
                  label={"Categoría de Items"}
                  rute={"category-items"}
               />
            </Can>
            <Can I="ViewTax" a="user">
               <NavItemMenuLayout label={"Impuestos"} rute={"taxs"} />
            </Can>
            <NavLink
               active={
                  location.pathname === "/create-adjustment" ||
                  location.pathname === "/adjustments"
               }
               label="Ajustes de Stock"
               icon={<IconArrowsMoveHorizontal size={16} stroke={1.5} />}
               childrenOffset={28}
               color="violet"
               variant="light"
               sx={(theme) => ({
                  borderRadius: theme.radius.md,
               })}
            >
               <Can I="ViewAdjustment" a="user">
                  <NavItemMenuLayout label={"Ajustes"} rute={"adjustments"} />
               </Can>
               <Can I="CreateAdjustment" a="user">
                  <NavItemMenuLayout
                     label={"Crear Ajuste"}
                     rute={"create-adjustment"}
                  />
               </Can>
            </NavLink>
         </NavLink>
         <NavLink
            active={
               location.pathname === "/orders" ||
               location.pathname === "/create-order" ||
               location.pathname === "/order-returns"
            }
            label="Compras"
            icon={<IconFingerprint size={16} stroke={1.5} />}
            childrenOffset={28}
            color="violet"
            variant="light"
            sx={(theme) => ({
               borderRadius: theme.radius.md,
            })}
         >
            <Can I="ViewOrder" a="user">
               <NavItemMenuLayout label={"Compras"} rute={"orders"} />
            </Can>
            <Can I="CreateOrder" a="user">
               <NavItemMenuLayout
                  label={"Crear Compra"}
                  rute={"create-order"}
               />
            </Can>
            <Can I="ViewOrderReturn" a="user">
               <NavItemMenuLayout
                  label={"Retornos de Compras"}
                  rute={"order-returns"}
               />
            </Can>
         </NavLink>
         <NavLink
            active={
               location.pathname === "/customers" ||
               location.pathname === "/suppliers"
            }
            label="Personas"
            icon={<IconFingerprint size={16} stroke={1.5} />}
            childrenOffset={28}
            color="violet"
            variant="light"
            sx={(theme) => ({
               borderRadius: theme.radius.md,
            })}
         >
            <NavItemMenuLayout label={"Clientes"} rute={"customers"} />
            <Can I="ViewSupplier" a="user">
               <NavItemMenuLayout label={"Proveedores"} rute={"suppliers"} />
            </Can>
         </NavLink>
         <NavLink
            active={
               location.pathname === "/pos" ||
               location.pathname === "/sales" ||
               location.pathname === "/create-sale"
            }
            label="Ventas"
            icon={<IconFingerprint size={16} stroke={1.5} />}
            childrenOffset={28}
            color="violet"
            variant="light"
            sx={(theme) => ({
               borderRadius: theme.radius.md,
            })}
         >
            <Can I="ViewPos" a="user">
               <NavItemMenuLayout label={"Pos"} rute={"pos"} />
            </Can>
            <Can I="ViewSale" a="user">
               <NavItemMenuLayout label={"Ventas"} rute={"sales"} />
            </Can>
            <Can I="CreateSale" a="user">
               <NavItemMenuLayout label={"Crear Venta"} rute={"create-sale"} />
            </Can>
         </NavLink>
      </>
   )
}

export default NavMenuLayout
