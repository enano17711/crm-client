import type { PaginatedResultSupplierDto } from "./PaginatedResultSupplierDto"

export type ResTfulResultPaginatedResultSupplierDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: PaginatedResultSupplierDto
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
