import React, { useState } from "react"
import { ActionIcon, Group, Menu, Space, Tooltip } from "@mantine/core"
import { DataGridBrandComponent } from "./components/DataGridBrand.component.tsx"
import { Can } from "../../access-control.ts"
import {
   IconColumns3,
   IconCopy,
   IconCsv,
   IconEdit,
   IconFileExport,
   IconPdf,
   IconPlus,
   IconRefresh,
   IconTrash,
} from "@tabler/icons-react"
import { accessTokenKey, refreshAccessTokenKey } from "../../axios-utils.ts"
import SearchBrandByColumnComponent from "./components/SearchBrandByColumn.component.tsx"
import { Link, useNavigate } from "react-router-dom"
import DialogDeleteBrandComponent from "./components/DialogDeleteBrand.component.tsx"
import { useTable } from "ka-table"
import { useAtom } from "jotai"
import { selectedBrandAtom } from "../../store/brand.atoms.ts"

const BrandsView = () => {
   const [selectedBrand, setSelectedBrand] = useAtom(selectedBrandAtom)
   const [openDeleteModal, setOpenDeleteModal] = useState(false)
   const [searchData, setSearchData] = useState<{
      column?: string
      value?: string
   }>({
      column: "Name",
      value: null,
   })
   const navigate = useNavigate()
   const table = useTable()

   const exportCsv = () => {
      fetch("https://localhost:5001/api/brand/download-brand-excel", {
         method: "POST",
         headers: {
            "Content-Type": "application/csv",
            Authorization: "Bearer " + localStorage.getItem(accessTokenKey),
            "X-Authorization":
               "Bearer " + localStorage.getItem(refreshAccessTokenKey),
         },
      })
         .then((res) => res.blob())
         .then((blob) => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.style.display = "none"
            a.href = url
            a.download = "brand.csv"
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
         })
   }
   const exportPdf = () => {
      const userData = window.localStorage.getItem("userDataSession")
      const userId = JSON.parse(userData!).userId

      fetch("https://localhost:5001/api/brand/download-brand-pdf/" + userId, {
         method: "POST",
         headers: {
            "Content-Type": "application/pdf",
            Authorization: "Bearer " + localStorage.getItem(accessTokenKey),
            "X-Authorization":
               "Bearer " + localStorage.getItem(refreshAccessTokenKey),
         },
      })
         .then((res) => res.blob())
         .then((blob) => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.style.display = "none"
            a.href = url
            a.download = "brand.pdf"
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
         })
   }

   return (
      <Can I="ViewBrand" a="user">
         <Group position="apart">
            <Group>
               <Link to="/brands/create">
                  <Tooltip
                     label="Nuevo"
                     color="orange"
                     position="bottom"
                     withArrow
                     arrowPosition="center"
                  >
                     <ActionIcon color="orange" variant="light" size="lg">
                        <IconPlus />
                     </ActionIcon>
                  </Tooltip>
               </Link>
               {selectedBrand?.name !== undefined ? (
                  <Link
                     to={`/brands/create/${selectedBrand?.name}/${selectedBrand?.description}`}
                  >
                     <Tooltip
                        label="Clonar"
                        color="indigo"
                        position="bottom"
                        withArrow
                        arrowPosition="center"
                     >
                        <ActionIcon color="indigo" variant="light" size="lg">
                           <IconCopy />
                        </ActionIcon>
                     </Tooltip>
                  </Link>
               ) : (
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
                        disabled
                     >
                        <IconCopy />
                     </ActionIcon>
                  </Tooltip>
               )}
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
                     <ActionIcon color="lime" variant="light" size="lg">
                        <IconFileExport />
                     </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                     <Menu.Item
                        icon={<IconPdf size={14} />}
                        onClick={exportPdf}
                     >
                        PDF
                     </Menu.Item>
                     <Menu.Item
                        icon={<IconCsv size={14} />}
                        onClick={exportCsv}
                     >
                        CSV
                     </Menu.Item>
                  </Menu.Dropdown>
               </Menu>
               <ActionIcon color="red" variant="light" size="lg">
                  <IconColumns3 />
               </ActionIcon>
            </Group>
            <ActionIcon color="red" variant="light" size="lg">
               <IconRefresh />
            </ActionIcon>
         </Group>
         <Space h="sm" />
         <DataGridBrandComponent />
         <DialogDeleteBrandComponent
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
         />
      </Can>
   )
}

export default BrandsView
