import React, { useCallback } from "react"
import { ActionIcon, Menu } from "@mantine/core"
import {
   IconBoxAlignBottomLeft,
   IconCalendarTime,
   IconFileX,
   IconMessageCircle,
   IconReceipt,
   IconSettings,
} from "@tabler/icons-react"
import { useAppStore } from "../../../store"

interface OrderStatusActionColumnProps {
   data: any
}

const OrderStatusActionColumnComponent = ({
   data,
}: OrderStatusActionColumnProps) => {
   const { ordersStore } = useAppStore()
   const handleClickMenuItem = useCallback(
      (status) => {
         ordersStore.actions
            .updateOrderStatus(data.row.data.orderId, status)
            .finally(() => data.component.refresh())
      },
      [ordersStore.actions, data.row.data.orderId, data.component],
   )

   return (
      <div>
         <Menu shadow="md" width={160}>
            <Menu.Target>
               <ActionIcon color="blue">
                  <IconSettings size={14} />
               </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
               <Menu.Label>Change Status</Menu.Label>
               {data.row.data.status === "Pending" && (
                  <>
                     <Menu.Item
                        icon={<IconReceipt size={14} />}
                        onClick={() => handleClickMenuItem("Received")}
                     >
                        Received
                     </Menu.Item>
                     <Menu.Item
                        icon={<IconBoxAlignBottomLeft size={14} />}
                        onClick={() => handleClickMenuItem("Partial")}
                     >
                        Partial
                     </Menu.Item>
                     <Menu.Item
                        icon={<IconFileX size={14} />}
                        onClick={() => handleClickMenuItem("Nullify")}
                     >
                        Nullify
                     </Menu.Item>
                  </>
               )}
               {data.row.data.status === "Partial" && (
                  <>
                     <Menu.Item
                        icon={<IconReceipt size={14} />}
                        onClick={() => handleClickMenuItem("Received")}
                     >
                        Received
                     </Menu.Item>
                     <Menu.Item
                        icon={<IconCalendarTime size={14} />}
                        onClick={() => handleClickMenuItem("Pending")}
                     >
                        Pending
                     </Menu.Item>
                     <Menu.Item
                        icon={<IconFileX size={14} />}
                        onClick={() => handleClickMenuItem("Nullify")}
                     >
                        Nullify
                     </Menu.Item>
                  </>
               )}
               {data.row.data.status === "Received" && (
                  <>
                     <Menu.Item
                        icon={<IconCalendarTime size={14} />}
                        onClick={() => handleClickMenuItem("Pending")}
                     >
                        Pending
                     </Menu.Item>
                     <Menu.Item
                        icon={<IconBoxAlignBottomLeft size={14} />}
                        onClick={() => handleClickMenuItem("Partial")}
                     >
                        Partial
                     </Menu.Item>
                     <Menu.Item
                        icon={<IconFileX size={14} />}
                        onClick={() => handleClickMenuItem("Nullify")}
                     >
                        Nullify
                     </Menu.Item>
                  </>
               )}
            </Menu.Dropdown>
         </Menu>
      </div>
   )
}

export default OrderStatusActionColumnComponent
