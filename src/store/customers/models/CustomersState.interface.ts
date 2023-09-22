import { CustomerDto } from "../../../api-services"

export interface CustomersStateInterface {
   loading: boolean
   error?: string
   customers: CustomerDto[]
   singleModel?: CustomerDto
   openUpdateModal: boolean
   openDeleteModal: boolean
   modalType: "create" | "update"
}
