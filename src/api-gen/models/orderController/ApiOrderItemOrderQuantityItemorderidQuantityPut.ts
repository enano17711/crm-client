import type { ResTfulResultItemOrderDto } from "../ResTfulResultItemOrderDto"

export type ApiOrderItemOrderQuantityItemorderidQuantityPutPathParams = {
   /**
    * @type integer int64
    */
   itemorderid: number
   /**
    * @type number double
    */
   quantity: number
}

/**
 * @description Success
 */
export type ApiOrderItemOrderQuantityItemorderidQuantityPutMutationResponse =
   ResTfulResultItemOrderDto
