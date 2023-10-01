import type { UpdateCustomerDto } from "../UpdateCustomerDto"
import type { ResTfulResultCustomerDto } from "../ResTfulResultCustomerDto"

export type ApiCustomerCustomerIdPutPathParams = {
   /**
    * @type integer int64
    */
   id: number
}

export type ApiCustomerCustomerIdPutMutationRequest = UpdateCustomerDto

/**
 * @description Success
 */
export type ApiCustomerCustomerIdPutMutationResponse = ResTfulResultCustomerDto
