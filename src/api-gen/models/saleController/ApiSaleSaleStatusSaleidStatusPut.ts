import type { ResTfulResultSaleDto } from "../ResTfulResultSaleDto"

export type ApiSaleSaleStatusSaleidStatusPutPathParams = {
   /**
    * @type integer int64
    */
   saleid: number
   /**
    * @type string
    */
   status: string
}

/**
 * @description Success
 */
export type ApiSaleSaleStatusSaleidStatusPutMutationResponse =
   ResTfulResultSaleDto
