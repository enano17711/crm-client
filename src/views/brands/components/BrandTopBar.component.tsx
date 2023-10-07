import React, { useCallback } from "react"
import { ActionIcon, Checkbox, Group, Menu, Tooltip } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import {
   IconColumns3,
   IconCopy,
   IconCsv,
   IconEdit,
   IconFileExport,
   IconPdf,
   IconRefresh,
   IconTrash,
} from "@tabler/icons-react"
import SearchBrandByColumnComponent from "./SearchBrandByColumn.component.tsx"
import { useAtom, useSetAtom } from "jotai"
import {
   brandGridColumnsVisibleAtom,
   openBrandDeleteModalAtom,
   selectedBrandAtom,
} from "../../../store/brand.atoms.ts"
import { useQueryClient } from "@tanstack/react-query"
import { exportCsv, exportPdf } from "../../../utils/index.ts"
import ActionCreateComponent from "../../../components/top-bar/ActionCreate.component.tsx"

const BrandTopBarComponent = () => {
   const [gridColumnsVisible, setGridColumnsVisible] = useAtom(
      brandGridColumnsVisibleAtom,
   )
   const [selectedBrand, setSelectedBrand] = useAtom(selectedBrandAtom)
   const setOpenDeleteModal = useSetAtom(openBrandDeleteModalAtom)
   const navigate = useNavigate()
   const queryClient = useQueryClient()

   const onActionCreateBrand = useCallback(() => {
      setSelectedBrand({})
      navigate("/brands/create")
   }, [navigate, setSelectedBrand])

   return (
      <Group position="apart">
         <Group>
            <ActionCreateComponent createFunction={onActionCreateBrand} />
            <Tooltip
               label="Clonar"
               color="indigo"
               position="bottom"
               withArrow
               arrowPosition="center"
            >
               <ActionIcon
                  color="indigo"
                  variant="light"
                  size="lg"
                  onClick={() => navigate("/brands/create")}
                  disabled={!(selectedBrand?.name !== undefined)}
               >
                  <IconCopy />
               </ActionIcon>
            </Tooltip>
            <Tooltip
               label="Editar"
               color="grape"
               position="bottom"
               withArrow
               arrowPosition="center"
            >
               <ActionIcon
                  color="grape"
                  variant="light"
                  size="lg"
                  onClick={() =>
                     navigate("/brands/update/" + selectedBrand?.brandId)
                  }
                  disabled={!(selectedBrand?.name !== undefined)}
               >
                  <IconEdit />
               </ActionIcon>
            </Tooltip>
            <Tooltip
               label="Borrar"
               color="red"
               position="bottom"
               withArrow
               arrowPosition="center"
            >
               <ActionIcon
                  color="red"
                  variant="light"
                  size="lg"
                  disabled={!(selectedBrand?.name !== undefined)}
                  onClick={() => setOpenDeleteModal(true)}
               >
                  <IconTrash />
               </ActionIcon>
            </Tooltip>
            <SearchBrandByColumnComponent />
            <Menu shadow="md">
               <Menu.Target>
                  <Tooltip
                     label="Exportar"
                     color="lime"
                     position="bottom"
                     withArrow
                     arrowPosition="center"
                  >
                     <ActionIcon color="lime" variant="light" size="lg">
                        <IconFileExport />
                     </ActionIcon>
                  </Tooltip>
               </Menu.Target>
               <Menu.Dropdown>
                  <Menu.Label>Exportar</Menu.Label>
                  <Menu.Item
                     icon={<IconPdf size={14} />}
                     onClick={() =>
                        exportPdf("brand/download-brand-pdf", "brands.pdf")
                     }
                  >
                     PDF
                  </Menu.Item>
                  <Menu.Item
                     icon={<IconCsv size={14} />}
                     onClick={() =>
                        exportCsv("brand/download-brand-excel", "brands.xlsx")
                     }
                  >
                     CSV
                  </Menu.Item>
               </Menu.Dropdown>
            </Menu>
            <Menu shadow="md">
               <Menu.Target>
                  <Tooltip
                     label="Columnas"
                     color="red"
                     position="bottom"
                     withArrow
                     arrowPosition="center"
                  >
                     <ActionIcon color="red" variant="light" size="lg">
                        <IconColumns3 />
                     </ActionIcon>
                  </Tooltip>
               </Menu.Target>
               <Menu.Dropdown>
                  <Menu.Label>Columnas</Menu.Label>
                  <Checkbox.Group
                     value={gridColumnsVisible}
                     onChange={setGridColumnsVisible}
                     w={200}
                  >
                     <Group mt="xs" px="xs" pb="xs">
                        <Checkbox value="name" label="Nombre" />
                        <Checkbox value="description" label="Descripcion" />
                     </Group>
                  </Checkbox.Group>
               </Menu.Dropdown>
            </Menu>
         </Group>
         <Tooltip
            label="Refrescar"
            color="red"
            position="bottom"
            withArrow
            arrowPosition="center"
         >
            <ActionIcon
               color="red"
               variant="light"
               size="lg"
               onClick={() =>
                  queryClient.invalidateQueries({
                     queryKey: ["/api/brand/brands"],
                  })
               }
            >
               <IconRefresh />
            </ActionIcon>
         </Tooltip>
      </Group>
   )
}

export default BrandTopBarComponent
