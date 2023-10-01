import type { UnitDto } from "./UnitDto"
import type { MetaData } from "./MetaData"

export type PaginatedResultUnitDto = {
   /**
    * @type array | undefined
    */
   items?: UnitDto[]
   metaData?: MetaData
}
