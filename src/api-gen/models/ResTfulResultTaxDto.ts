import type { TaxDto } from "./TaxDto"

export type ResTfulResultTaxDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: TaxDto
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
