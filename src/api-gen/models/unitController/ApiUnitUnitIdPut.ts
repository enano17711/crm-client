import type { UpdateUnitDto } from "../UpdateUnitDto"

export type ApiUnitUnitIdPutMutationResponse = any | null

export type ApiUnitUnitIdPutPathParams = {
   /**
    * @description The ID of the unit to update.
    * @type integer int64
    */
   id: number
}

/**
 * @description The DTO containing the updated unit information.
 */
export type ApiUnitUnitIdPutMutationRequest = UpdateUnitDto
