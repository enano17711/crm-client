import type { PaginatedResponseBrandSimpleDto } from "./PaginatedResponseBrandSimpleDto"

export type ResTfulResultPaginatedResponseBrandSimpleDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: PaginatedResponseBrandSimpleDto
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
