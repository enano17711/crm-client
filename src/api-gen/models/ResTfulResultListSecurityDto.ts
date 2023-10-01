import type { SecurityDto } from "./SecurityDto"

export type ResTfulResultListSecurityDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   /**
    * @type array | undefined
    */
   data?: SecurityDto[]
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
