import type { BaseUnitSimpleDto } from "./BaseUnitSimpleDto"

export type PaginatedResponseBaseUnitSimpleDto = {
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
   items?: BaseUnitSimpleDto[]
}
