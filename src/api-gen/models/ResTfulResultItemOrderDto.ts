import type { ItemOrderDto } from "./ItemOrderDto"

export type ResTfulResultItemOrderDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: ItemOrderDto
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
