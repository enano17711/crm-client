import type { SupplierDto } from "./SupplierDto"
import type { MetaData } from "./MetaData"

export type PaginatedResultSupplierDto = {
   /**
    * @type array | undefined
    */
   items?: SupplierDto[]
   metaData?: MetaData
}
