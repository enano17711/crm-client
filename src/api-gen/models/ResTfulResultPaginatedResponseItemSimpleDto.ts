import type { PaginatedResponseItemSimpleDto } from "./PaginatedResponseItemSimpleDto"

export type ResTfulResultPaginatedResponseItemSimpleDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: PaginatedResponseItemSimpleDto
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
