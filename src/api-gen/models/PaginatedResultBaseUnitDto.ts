import type { BaseUnitDto } from "./BaseUnitDto"
import type { MetaData } from "./MetaData"

export type PaginatedResultBaseUnitDto = {
   /**
    * @type array | undefined
    */
   items?: BaseUnitDto[]
   metaData?: MetaData
}
