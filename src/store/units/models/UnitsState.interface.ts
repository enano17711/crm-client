import { UnitDto } from "../../../api-services"

export interface UnitsStateInterface {
   loading: boolean
   error?: string
   units: UnitDto[]
   singleModel?: UnitDto
   openUpdateModal: boolean
   openDeleteModal: boolean
   modalType: "create" | "update"
}
