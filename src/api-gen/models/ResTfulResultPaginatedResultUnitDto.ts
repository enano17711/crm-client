import type { PaginatedResultUnitDto } from "./PaginatedResultUnitDto"

export type ResTfulResultPaginatedResultUnitDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: PaginatedResultUnitDto
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
