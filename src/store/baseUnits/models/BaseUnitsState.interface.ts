import { BaseUnitDto } from "../../../api-services"

/**
 * @name BaseUnitsStateInterface
 * @description Interface represents our BaseUnits state
 */
export interface BaseUnitsStateInterface {
   loading: boolean
   error?: string
   baseUnits: BaseUnitDto[]
   singleModel?: BaseUnitDto
   openUpdateModal: boolean
   openDeleteModal: boolean
   modalType: "create" | "update"
}
