import { Workbook } from "exceljs"
import saveAs from "file-saver"
import { exportDataGrid } from "devextreme/excel_exporter"
import { jsPDF } from "jspdf"
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter"
import { notifications } from "@mantine/notifications"

export const exportFormats = ["xlsx", "pdf"]

export function exportGrid(e) {
   if (e.format === "xlsx") {
      const workbook = new Workbook()
      const worksheet = workbook.addWorksheet(e.element.id)
      exportDataGrid({
         worksheet: worksheet,
         component: e.component,
      }).then(function () {
         workbook.xlsx.writeBuffer().then(function (buffer) {
            saveAs(
               new Blob([buffer], { type: "application/octet-stream" }),
               `${e.element.id}.xlsx`,
            )
         })
      })
   } else if (e.format === "pdf") {
      const doc = new jsPDF()
      exportDataGridToPdf({
         jsPDFDocument: doc,
         component: e.component,
      }).then(() => {
         doc.save(`${e.element.id}.pdf`)
      })
   }
}

export const successNotification = (message?: string) => {
   return notifications.show({
      title: "Operación Exitosa",
      message: "Datos cargados con éxito",
      color: "teal",
   })
}

export const errorNotification = (message?: string) => {
   return notifications.show({
      title: "Operación Fallida",
      message: message,
      color: "red",
      opacity: 0.3,
   })
}
