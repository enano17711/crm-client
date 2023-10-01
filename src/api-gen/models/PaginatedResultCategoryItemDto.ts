import type { CategoryItemDto } from "./CategoryItemDto"
import type { MetaData } from "./MetaData"

export type PaginatedResultCategoryItemDto = {
   /**
    * @type array | undefined
    */
   items?: CategoryItemDto[]
   metaData?: MetaData
}
