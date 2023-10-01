import type { PaginatedResultOrderDto } from "./PaginatedResultOrderDto"

export type ResTfulResultPaginatedResultOrderDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: PaginatedResultOrderDto
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
