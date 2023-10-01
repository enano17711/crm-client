import type { UpdateSupplierDto } from "../UpdateSupplierDto"
import type { ResTfulResultSupplierDto } from "../ResTfulResultSupplierDto"

export type ApiSupplierSupplierIdPutPathParams = {
   /**
    * @type integer int64
    */
   id: number
}

export type ApiSupplierSupplierIdPutMutationRequest = UpdateSupplierDto

/**
 * @description Success
 */
export type ApiSupplierSupplierIdPutMutationResponse = ResTfulResultSupplierDto
