import type { ItemSaleDto } from "./ItemSaleDto"

export type ResTfulResultItemSaleDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: ItemSaleDto
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
