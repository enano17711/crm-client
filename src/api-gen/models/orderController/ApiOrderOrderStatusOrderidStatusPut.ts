import type { ResTfulResultOrderDto } from "../ResTfulResultOrderDto"

export type ApiOrderOrderStatusOrderidStatusPutPathParams = {
   /**
    * @type integer int64
    */
   orderid: number
   /**
    * @type string
    */
   status: string
}

/**
 * @description Success
 */
export type ApiOrderOrderStatusOrderidStatusPutMutationResponse =
   ResTfulResultOrderDto
