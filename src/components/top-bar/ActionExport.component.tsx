import React from "react"
import { ActionIcon, Menu, Tooltip } from "@mantine/core"
import { IconCsv, IconFileExport, IconPdf } from "@tabler/icons-react"
import { exportCsv, exportPdf } from "../../utils"

interface ActionExportComponentProps {
   pdfUrl: string
   pdfName: string
   excelUrl: string
   excelName: string
}

const ActionExportComponent = ({
   pdfUrl,
   pdfName,
   excelUrl,
   excelName,
}: ActionExportComponentProps) => {
   return (
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
               onClick={() => exportPdf(pdfUrl, pdfName)}
            >
               PDF
            </Menu.Item>
            <Menu.Item
               icon={<IconCsv size={14} />}
               onClick={() => exportCsv(excelUrl, excelName)}
            >
               CSV
            </Menu.Item>
         </Menu.Dropdown>
      </Menu>
   )
}

export default ActionExportComponent
