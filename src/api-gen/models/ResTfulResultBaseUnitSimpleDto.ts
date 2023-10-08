import type { BaseUnitSimpleDto } from "./BaseUnitSimpleDto"

export type ResTfulResultBaseUnitSimpleDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: BaseUnitSimpleDto
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
