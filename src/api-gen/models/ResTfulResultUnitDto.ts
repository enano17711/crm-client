import type { UnitDto } from "./UnitDto"

export type ResTfulResultUnitDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: UnitDto
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
