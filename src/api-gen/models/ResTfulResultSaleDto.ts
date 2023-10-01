import type { SaleDto } from "./SaleDto"

export type ResTfulResultSaleDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: SaleDto
   /**
    * @type boolean | undefined
    */
   succeeded?: boolean
   errors?: any
   extras?: any
   /**
    * @type integer | undefined int64
    */
   timestamp?: number
}
