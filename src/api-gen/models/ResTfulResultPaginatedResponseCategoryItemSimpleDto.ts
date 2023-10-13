import type { PaginatedResponseCategoryItemSimpleDto } from "./PaginatedResponseCategoryItemSimpleDto"

export type ResTfulResultPaginatedResponseCategoryItemSimpleDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: PaginatedResponseCategoryItemSimpleDto
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
