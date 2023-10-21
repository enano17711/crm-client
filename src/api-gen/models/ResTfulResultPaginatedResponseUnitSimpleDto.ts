import type { PaginatedResponseUnitSimpleDto } from "./PaginatedResponseUnitSimpleDto"

export type ResTfulResultPaginatedResponseUnitSimpleDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: PaginatedResponseUnitSimpleDto
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
