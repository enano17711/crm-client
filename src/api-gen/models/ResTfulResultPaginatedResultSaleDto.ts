import type { PaginatedResultSaleDto } from "./PaginatedResultSaleDto"

export type ResTfulResultPaginatedResultSaleDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: PaginatedResultSaleDto
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
