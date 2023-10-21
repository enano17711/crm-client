import type { UnitSimpleDto } from "./UnitSimpleDto"

export type PaginatedResponseUnitSimpleDto = {
   /**
    * @type integer | undefined int32
    */
   pageNumber?: number
   /**
    * @type integer | undefined int32
    */
   pageSize?: number
   /**
    * @type integer | undefined int32
    */
   totalNumber?: number
   /**
    * @type integer | undefined int32
    */
   totalPage?: number
   /**
    * @type array | undefined
    */
   items?: UnitSimpleDto[]
}
