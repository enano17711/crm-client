import type { LoginOutput } from "./LoginOutput"

export type ResTfulResultLoginOutput = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: LoginOutput
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
