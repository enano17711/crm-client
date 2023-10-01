import type { OrderReturnDto } from "./OrderReturnDto"
import type { MetaData } from "./MetaData"

export type PaginatedResultOrderReturnDto = {
   /**
    * @type array | undefined
    */
   items?: OrderReturnDto[]
   metaData?: MetaData
}
