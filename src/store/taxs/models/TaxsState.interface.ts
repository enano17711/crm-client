import { TaxDto } from "../../../api-services"

export interface TaxsStateInterface {
   loading: boolean
   error?: string
   taxs: TaxDto[]
   singleModel?: TaxDto
   openUpdateModal: boolean
   openDeleteModal: boolean
   modalType: "create" | "update"
}
