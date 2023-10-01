import type { CustomerDto } from "./CustomerDto"
import type { MetaData } from "./MetaData"

export type PaginatedResultCustomerDto = {
   /**
    * @type array | undefined
    */
   items?: CustomerDto[]
   metaData?: MetaData
}
