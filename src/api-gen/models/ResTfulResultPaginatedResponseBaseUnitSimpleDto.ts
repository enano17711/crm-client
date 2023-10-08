import type { PaginatedResponseBaseUnitSimpleDto } from "./PaginatedResponseBaseUnitSimpleDto"

export type ResTfulResultPaginatedResponseBaseUnitSimpleDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: PaginatedResponseBaseUnitSimpleDto
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
