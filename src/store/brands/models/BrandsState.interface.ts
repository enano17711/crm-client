import { BrandDto } from "../../../api-services"

export interface BrandsStateInterface {
   loading: boolean
   error?: string
   brands: BrandDto[]
   singleModel?: BrandDto
   openUpdateModal: boolean
   openDeleteModal: boolean
   modalType: "create" | "update"
}
