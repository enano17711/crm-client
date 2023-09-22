import { OrderReturnDto } from "../../../api-services"

export interface OrderReturnsStateInterface {
   loading: boolean
   error?: string
   openUpdateModal: boolean
   orderReturns: OrderReturnDto[]
}
