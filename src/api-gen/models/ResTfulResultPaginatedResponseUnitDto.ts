import type { PaginatedResponseUnitDto } from "./PaginatedResponseUnitDto"

export type ResTfulResultPaginatedResponseUnitDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: PaginatedResponseUnitDto
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
