import { ItemOrderDto, OrderDto } from "../../../api-services"

export interface OrdersStateInterface {
   loading: boolean
   error?: string
   orders: OrderDto[]
   singleModel?: ItemOrderDto
   openUpdateModal: boolean
   openStatusModal: boolean
}
