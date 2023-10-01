import type { PaginatedResultCustomerDto } from "./PaginatedResultCustomerDto"

export type ResTfulResultPaginatedResultCustomerDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: PaginatedResultCustomerDto
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
