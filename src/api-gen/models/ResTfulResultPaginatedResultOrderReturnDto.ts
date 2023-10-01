import type { PaginatedResultOrderReturnDto } from "./PaginatedResultOrderReturnDto"

export type ResTfulResultPaginatedResultOrderReturnDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: PaginatedResultOrderReturnDto
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
