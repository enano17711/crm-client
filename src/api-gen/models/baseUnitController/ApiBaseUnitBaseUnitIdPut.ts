import type { UpdateBaseUnitDto } from "../UpdateBaseUnitDto"
import type { ResTfulResultBaseUnitDto } from "../ResTfulResultBaseUnitDto"

export type ApiBaseUnitBaseUnitIdPutPathParams = {
   /**
    * @type integer int64
    */
   id: number
}

export type ApiBaseUnitBaseUnitIdPutMutationRequest = UpdateBaseUnitDto

/**
 * @description Success
 */
export type ApiBaseUnitBaseUnitIdPutMutationResponse = ResTfulResultBaseUnitDto
