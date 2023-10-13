import type { SupplierSimpleDto } from "./SupplierSimpleDto"

export type ResTfulResultSupplierSimpleDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: SupplierSimpleDto
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
