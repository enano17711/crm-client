import type { BaseUnit } from "./BaseUnit"

export type Unit = {
   /**
    * @type boolean | undefined
    */
   isDeleted?: boolean
   /**
    * @type string | undefined date-time
    */
   deletedAt?: Date
   /**
    * @type integer | undefined int64
    */
   deletedBy?: number
   /**
    * @type string | undefined date-time
    */
   createdAt?: Date
   /**
    * @type integer | undefined int64
    */
   createdBy?: number
   /**
    * @type string | undefined date-time
    */
   updatedAt?: Date
   /**
    * @type integer | undefined int64
    */
   updatedBy?: number
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
   /**
    * @type integer | undefined int64
    */
   baseUnitId?: number
   baseUnit?: BaseUnit
}
