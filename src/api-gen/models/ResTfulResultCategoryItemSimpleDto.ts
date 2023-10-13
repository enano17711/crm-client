import type { CategoryItemSimpleDto } from "./CategoryItemSimpleDto"

export type ResTfulResultCategoryItemSimpleDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: CategoryItemSimpleDto
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
