import type { ResTfulResultPaginatedResponseBaseUnitSimpleDto } from "../ResTfulResultPaginatedResponseBaseUnitSimpleDto"

export type ApiBaseUnitBaseUnitsGetQueryParams = {
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
export type ApiBaseUnitBaseUnitsGetQueryResponse =
   ResTfulResultPaginatedResponseBaseUnitSimpleDto
