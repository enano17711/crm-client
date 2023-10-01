import type { AdjustmentDto } from "./AdjustmentDto"
import type { MetaData } from "./MetaData"

export type PaginatedResultAdjustmentDto = {
   /**
    * @type array | undefined
    */
   items?: AdjustmentDto[]
   metaData?: MetaData
}
