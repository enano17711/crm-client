import type { AdjustmentDto } from "./AdjustmentDto"

export type ResTfulResultAdjustmentDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: AdjustmentDto
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
