import type { OrderDto } from "./OrderDto"

export type ResTfulResultOrderDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: OrderDto
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
