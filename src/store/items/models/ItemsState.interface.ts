import { ItemBatchDto, ItemDto } from "../../../api-services"

export interface ItemsStateInterface {
   loading: boolean
   error?: string
   items: ItemDto[]
   singleModel?: ItemDto
   singleModelBatch?: ItemBatchDto
   openUpdateModal: boolean
   openDeleteModal: boolean
   openCreateItemBatchModal: boolean
   openDeleteItemBatchModal: boolean
   modalType: "create" | "update"
   itemIdForBatch?: number
}
