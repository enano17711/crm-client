import CustomBreadcrumbsComponent from "../../components/CustomBreadcrumbs.component.tsx"
import { Button, Group, Space } from "@mantine/core"
import { IconCsv, IconPdf, IconPlus } from "@tabler/icons-react"
import { ModalCreateItemComponent } from "./components/ModalCreateItem.component.tsx"
import { DataGridItemComponent } from "./components/DataGridItem.component.tsx"
import DialogDeleteItemComponent from "./components/DialogDeleteItem.component.tsx"
import ModalCreateItemBatchComponent from "./components/ModalCreateItemBatch.component.tsx"
import DialogDeleteItemBatchComponent from "./components/DialogDeleteItemBatch.component.tsx"
import { Can } from "../../access-control.ts"
import React from "react"
import { accessTokenKey, refreshAccessTokenKey } from "../../axios-utils.ts"

const routes = [
   { path: "/", title: "Inicio" },
   { path: "/items", title: "Items" },
]
const ItemsView = () => {
   const exportCsv = () => {
      fetch("https://localhost:5001/api/brand/download-brand-excel", {
         method: "POST",
         headers: {
            "Content-Type": "application/csv",
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
      <Can I="ViewItem" a="user">
         <Group position="apart">
            <CustomBreadcrumbsComponent routes={routes} />
            <Group id="item-header">
               <Button leftIcon={<IconPdf />} onClick={exportPdf}>
                  Export
               </Button>
               <Button leftIcon={<IconCsv />} onClick={exportCsv}>
                  Export
               </Button>
            </Group>
         </Group>
         <Space h="sm" />
         <DataGridItemComponent />
         <ModalCreateItemBatchComponent />
         <DialogDeleteItemBatchComponent />
      </Can>
   )
}

export default ItemsView
