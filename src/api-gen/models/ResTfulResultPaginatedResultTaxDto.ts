import type { PaginatedResultTaxDto } from "./PaginatedResultTaxDto"

export type ResTfulResultPaginatedResultTaxDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: PaginatedResultTaxDto
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
