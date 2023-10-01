import type { UpdateTaxDto } from "../UpdateTaxDto"
import type { ResTfulResultTaxDto } from "../ResTfulResultTaxDto"

export type ApiTaxTaxIdPutPathParams = {
   /**
    * @type integer int64
    */
   id: number
}

export type ApiTaxTaxIdPutMutationRequest = UpdateTaxDto

/**
 * @description Success
 */
export type ApiTaxTaxIdPutMutationResponse = ResTfulResultTaxDto
