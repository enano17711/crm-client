import type { LoadResult } from "./LoadResult"

export type ResTfulResultLoadResult = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: LoadResult
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
