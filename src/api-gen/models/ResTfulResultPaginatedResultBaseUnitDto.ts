import type { PaginatedResultBaseUnitDto } from "./PaginatedResultBaseUnitDto"

export type ResTfulResultPaginatedResultBaseUnitDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: PaginatedResultBaseUnitDto
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
