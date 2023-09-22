import { ItemSaleDto, SaleDto } from "../../../api-services"

export interface SalesStateInterface {
   loading: boolean
   error?: string
   sales: SaleDto[]
   singleModel?: ItemSaleDto
   openUpdateModal: boolean
   openStatusModal: boolean
}
