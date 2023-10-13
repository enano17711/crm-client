import type { PaginatedResponseSupplierSimpleDto } from "./PaginatedResponseSupplierSimpleDto"

export type ResTfulResultPaginatedResponseSupplierSimpleDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: PaginatedResponseSupplierSimpleDto
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
