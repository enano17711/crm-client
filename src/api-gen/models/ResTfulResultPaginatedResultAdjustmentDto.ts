import type { PaginatedResultAdjustmentDto } from "./PaginatedResultAdjustmentDto"

export type ResTfulResultPaginatedResultAdjustmentDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: PaginatedResultAdjustmentDto
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
