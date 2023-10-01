import type { BaseUnitDto } from "./BaseUnitDto"

export type UnitDto = {
   /**
    * @type string | undefined
    */
   name?: string
   /**
    * @type string | undefined
    */
   description?: string
   /**
    * @type integer | undefined int64
    */
   unitId?: number
   /**
    * @type string | undefined
    */
   code?: string
   /**
    * @type string | undefined
    */
   operation?: string
   /**
    * @type number | undefined double
    */
   value?: number
   baseUnit?: BaseUnitDto
}
