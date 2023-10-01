import type { CategoryItemDto } from "./CategoryItemDto"

export type ResTfulResultCategoryItemDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: CategoryItemDto
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
