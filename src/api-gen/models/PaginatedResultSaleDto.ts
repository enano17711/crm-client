import type { SaleDto } from "./SaleDto"
import type { MetaData } from "./MetaData"

export type PaginatedResultSaleDto = {
   /**
    * @type array | undefined
    */
   items?: SaleDto[]
   metaData?: MetaData
}
