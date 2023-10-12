import type { TaxSimpleDto } from "./TaxSimpleDto"

export type PaginatedResponseTaxSimpleDto = {
   /**
    * @type integer | undefined int32
    */
   pageNumber?: number
   /**
    * @type integer | undefined int32
    */
   pageSize?: number
   /**
    * @type integer | undefined int32
    */
   totalNumber?: number
   /**
    * @type integer | undefined int32
    */
   totalPage?: number
   /**
    * @type array | undefined
    */
   items?: TaxSimpleDto[]
}
