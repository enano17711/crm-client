import CustomBreadcrumbsComponent from "../../components/CustomBreadcrumbs.component.tsx"
import React from "react"
import { ActionIcon, Button, Group, Menu, Space } from "@mantine/core"
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
import {
   accessTokenKey,
   getAPI,
   refreshAccessTokenKey,
} from "../../axios-utils.ts"
import { BrandApi } from "../../api-services"
import SearchByColumnComponent from "../../components/SearchByColumn.component.tsx"

const BrandsView = () => {
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
            <Group id="brand-header">
               <ActionIcon color="orange" variant="light" size="lg">
                  <IconPlus />
               </ActionIcon>
               <ActionIcon color="indigo" variant="light" size="lg">
                  <IconCopy />
               </ActionIcon>
               <ActionIcon color="grape" variant="light" size="lg">
                  <IconEdit />
               </ActionIcon>
               <ActionIcon color="red" variant="light" size="lg">
                  <IconTrash />
               </ActionIcon>
               <SearchByColumnComponent />
               <Menu shadow="md" width={200}>
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
                        Settings
                     </Menu.Item>
                     <Menu.Item
                        icon={<IconCsv size={14} />}
                        onClick={exportCsv}
                     >
                        Messages
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
      </Can>
   )
}

export default BrandsView
