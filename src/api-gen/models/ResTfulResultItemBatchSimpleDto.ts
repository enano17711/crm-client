import type { ItemBatchSimpleDto } from "./ItemBatchSimpleDto"

export type ResTfulResultItemBatchSimpleDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: ItemBatchSimpleDto
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
