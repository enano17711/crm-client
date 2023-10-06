import type { ResTfulResultPaginatedResponseBrandSimpleDto } from "../ResTfulResultPaginatedResponseBrandSimpleDto"

export type ApiBrandBrandsGetQueryParams = {
   /**
    * @type string | undefined
    */
   OrderBy?: string
   /**
    * @type string | undefined
    */
   OrderDirection?: string
   /**
    * @type integer | undefined int32
    */
   PageNumber?: number
   /**
    * @type integer | undefined int32
    */
   PageSize?: number
   /**
    * @type string | undefined
    */
   ColumnName?: string
   /**
    * @type string | undefined
    */
   ColumnValue?: string
}

/**
 * @description Success
 */
export type ApiBrandBrandsGetQueryResponse =
   ResTfulResultPaginatedResponseBrandSimpleDto
