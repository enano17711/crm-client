import { useAppStore } from "../../../store"
import { ItemOrderDto } from "../../../api-services"
import { Button } from "@mantine/core"

interface OrderItemQuantityUpdateActionColumnProps {
   data: any
}

const OrderItemQuantityUpdateActionColumnComponent = ({
   data,
}: OrderItemQuantityUpdateActionColumnProps) => {
   const { ordersStore } = useAppStore()

   return (
      <div>
         <Button
            onClick={() =>
               ordersStore.actions.prepareForUpdate(
                  data.row.data as ItemOrderDto,
               )
            }
         >
            Update
         </Button>
      </div>
   )
}

export default OrderItemQuantityUpdateActionColumnComponent
