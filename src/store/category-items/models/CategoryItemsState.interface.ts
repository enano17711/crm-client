import { CategoryItemDto } from "../../../api-services"

export interface CategoryItemsStateInterface {
   loading: boolean
   error?: string
   categoryItems: CategoryItemDto[]
   singleModel?: CategoryItemDto
   openUpdateModal: boolean
   openDeleteModal: boolean
   modalType: "create" | "update"
}
