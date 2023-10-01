import type { OrderDto } from "./OrderDto"
import type { MetaData } from "./MetaData"

export type PaginatedResultOrderDto = {
   /**
    * @type array | undefined
    */
   items?: OrderDto[]
   metaData?: MetaData
}
