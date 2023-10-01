import type { OrderReturnDto } from "./OrderReturnDto"

export type ResTfulResultOrderReturnDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: OrderReturnDto
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
