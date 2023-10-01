import type { IActionResult } from "./IActionResult"

export type ResTfulResultIActionResult = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: IActionResult
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
