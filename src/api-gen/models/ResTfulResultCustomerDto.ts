import type { CustomerDto } from "./CustomerDto"

export type ResTfulResultCustomerDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: CustomerDto
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
