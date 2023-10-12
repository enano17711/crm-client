import type { TaxSimpleDto } from "./TaxSimpleDto"

export type ResTfulResultTaxSimpleDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: TaxSimpleDto
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
