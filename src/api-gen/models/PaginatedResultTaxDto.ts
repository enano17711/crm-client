import type { TaxDto } from "./TaxDto"
import type { MetaData } from "./MetaData"

export type PaginatedResultTaxDto = {
   /**
    * @type array | undefined
    */
   items?: TaxDto[]
   metaData?: MetaData
}
