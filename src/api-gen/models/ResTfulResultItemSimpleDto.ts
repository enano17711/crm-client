import type { ItemSimpleDto } from "./ItemSimpleDto"

export type ResTfulResultItemSimpleDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: ItemSimpleDto
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
