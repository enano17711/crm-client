import type { BaseUnitDto } from "./BaseUnitDto"

export type ResTfulResultBaseUnitDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: BaseUnitDto
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
