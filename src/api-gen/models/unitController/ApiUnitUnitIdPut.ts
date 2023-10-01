import type { UpdateUnitDto } from "../UpdateUnitDto"
import type { ResTfulResultUnitDto } from "../ResTfulResultUnitDto"

export type ApiUnitUnitIdPutPathParams = {
   /**
    * @type integer int64
    */
   id: number
}

export type ApiUnitUnitIdPutMutationRequest = UpdateUnitDto

/**
 * @description Success
 */
export type ApiUnitUnitIdPutMutationResponse = ResTfulResultUnitDto
