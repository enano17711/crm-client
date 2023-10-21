import type { UnitSimpleDto } from "./UnitSimpleDto"

export type ResTfulResultUnitSimpleDto = {
   /**
    * @type integer | undefined int32
    */
   statusCode?: number
   data?: UnitSimpleDto
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
