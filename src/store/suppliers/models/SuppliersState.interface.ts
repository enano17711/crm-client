import { SupplierDto } from "../../../api-services"

export interface SuppliersStateInterface {
   loading: boolean
   error?: string
   suppliers: SupplierDto[]
   singleModel?: SupplierDto
   openUpdateModal: boolean
   openDeleteModal: boolean
   modalType: "create" | "update"
}
