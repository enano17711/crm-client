import type { SupplierDto } from "./SupplierDto"

export type ResTfulResultSupplierDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: SupplierDto
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
