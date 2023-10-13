import type { PaginatedResponseItemBatchSimpleDto } from "./PaginatedResponseItemBatchSimpleDto"

export type ResTfulResultPaginatedResponseItemBatchSimpleDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: PaginatedResponseItemBatchSimpleDto
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
