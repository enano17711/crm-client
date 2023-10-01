import type { PaginatedResultCategoryItemDto } from "./PaginatedResultCategoryItemDto"

export type ResTfulResultPaginatedResultCategoryItemDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: PaginatedResultCategoryItemDto
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
