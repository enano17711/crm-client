import type { PaginatedResponseTaxSimpleDto } from "./PaginatedResponseTaxSimpleDto"

export type ResTfulResultPaginatedResponseTaxSimpleDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: PaginatedResponseTaxSimpleDto
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
