import CustomBreadcrumbsComponent from "../../components/CustomBreadcrumbs.component.tsx"
import React from "react"
import { Button, Group, Space } from "@mantine/core"
import { DataGridBrandComponent } from "./components/DataGridBrand.component.tsx"
import { Can } from "../../access-control.ts"
import { IconCsv, IconPdf } from "@tabler/icons-react"
import {
   accessTokenKey,
   getAPI,
   refreshAccessTokenKey,
} from "../../axios-utils.ts"
import { BrandApi } from "../../api-services"

const routes = [
   { path: "/", title: "Inicio" },
   { path: "/brands", title: "Marcas" },
]
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
            <CustomBreadcrumbsComponent routes={routes} />
            <Group id="brand-header">
               <Button leftIcon={<IconPdf />} onClick={exportPdf}>
                  Export
               </Button>
               <Button leftIcon={<IconCsv />} onClick={exportCsv}>
                  Export
               </Button>
            </Group>
         </Group>
         <Space h="sm" />
         <DataGridBrandComponent />
      </Can>
   )
}

export default BrandsView
